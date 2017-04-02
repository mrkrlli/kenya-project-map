// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$(function(){
  var projectData;
  var kenyaMap;
  var markerClusters;
  var individualMapMarkers;

  $.ajax({
    url: '/projects-data.json',
    dataType: 'json',
    success: function( data ) {
      projectData = data;
      createMap(false);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log( "ERROR:  " + errorThrown );
    }
  });

  $('#clusterCheckBox').change(function() {
    if ($(this).is(':checked')) {
      kenyaMap.removeLayer(individualMapMarkers);
      kenyaMap.addLayer(markerClusters);
    } else {
      kenyaMap.removeLayer(markerClusters);
      kenyaMap.addLayer(individualMapMarkers);
    }
  });


  function createMap(useClusters) {
    kenyaMap = L.map('main-map').setView([0.0236, 37.9062], 6);

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'streets-v9',
      accessToken: 'pk.eyJ1IjoibWFya3JsaSIsImEiOiJjajBzeGptcm0wNGl2Mndqd3dzbWJ5MXdoIn0.6X8tRTfMn_tIZBBORINNfw'
    }).addTo(kenyaMap);

    markerClusters= L.markerClusterGroup();
    individualMapMarkers = new L.FeatureGroup();

    for (project of projectData["features"]) {
      if (!project["geometry"]) {
        continue;
      }

      // coordinates in data are [long, lat]: need to reverse them
      var coordinates = project["geometry"]["coordinates"].reverse();
      var marker = L.marker(coordinates);

      addPopUpToMapMarker(marker);

      markerClusters.addLayer(marker);
      individualMapMarkers.addLayer(marker);
    }

    // default to individual map markers, instead of clusters
    kenyaMap.addLayer(individualMapMarkers);
  }

  function addPopUpToMapMarker(marker) {
    var projectTitle = project["properties"]["project_title"];
    if (!projectTitle) {
      projectTitle = "No Project Title Available";
    }

    var projectDescription = project["properties"]["project_description"];
    if (!projectDescription) {
      projectDescription = "No Project Description Available";
    }

    var projectObjective = project["properties"]["project_objective"];
    if (!projectObjective) {
      projectObjective = "No Project Objective Available";
    }

    marker.bindPopup(`<p><b>${projectTitle}</b></p><p>${projectDescription}</p><p>${projectObjective}</p>`);
  }
});
