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
  // load data from json file
  var projectData;

  $.ajax({
    url: '/projects-data.json',
    dataType: 'json',
    success: function( data ) {
      projectData = data;
      addMapData();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log( "ERROR:  " + errorThrown );
    }
  });

  var kenyaMap = L.map('main-map').setView([0.0236, 37.9062], 6);

  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'streets-v9',
    accessToken: 'pk.eyJ1IjoibWFya3JsaSIsImEiOiJjajBzeGptcm0wNGl2Mndqd3dzbWJ5MXdoIn0.6X8tRTfMn_tIZBBORINNfw'
  }).addTo(kenyaMap);

  function addMapData() {
    for (project of projectData["features"]) {
      if (!project["geometry"]) {
        return;
      }

      // coordinates in data are [long, lat]: need to reverse them
      var coordinates = project["geometry"]["coordinates"].reverse();
      L.marker(coordinates).addTo(kenyaMap);
    }
  }
});
