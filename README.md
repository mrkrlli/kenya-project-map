# Kenya Funded Projects Mapbox

## Overview
This app shows a map of donor and government funded projects in Kenya.

- Each marker on the map represents a project.
  - Clicking on a marker will display the project's title, description, and objective, if available (not all projects have complete information).
- There is a checkbox option to display project markers as clusters, which groups markers if they are close together.
- The number of projects per county in Kenya are displayed as a choropleth map, with darkers shades indicating greater number of projects.

## Setup
This app runs on Ruby on Rails 5.0.2, with Ruby 2.3.1

#### Setting up Ruby
If you don't already have Ruby 2.3.1 installed or a Ruby version manager installed:

1. Install [rbenv](https://github.com/rbenv/rbenv) (a Ruby version manager): https://github.com/rbenv/rbenv#installation

  - Install using the "Basic GitHub Checkout" instructions.
1. Install [ruby-build](https://github.com/rbenv/ruby-build#readme) (an rbenv plugin that simplifies the process of installing new Ruby versions): https://github.com/rbenv/ruby-build#installing-as-an-rbenv-plugin-recommended

  - Install using the "Installing as an rbenv plugin" instructions.
1. Install Ruby 2.3.1:

  ```
  $ rbenv install 2.3.1
  ```

#### Run project locally

1. Clone the repo:

  ```
  $ git clone https://github.com/mrkrlli/kenya-project-map.git
  ```

1. `cd` into the project directory.

1. If you don't have [bundler](http://bundler.io/) (Ruby gem that manages Ruby app dependencies) installed:

  ```
  $ gem install bundler
  ```
1. Install the project's required gems (dependencies):

  ```
  $ bundle install
  ```

1. Run the rails server:

  ```
  $ bundle exec rails s
  ```

1. Once the rails server is running, the project should now be viewable in a browser at `localhost:3000`

## Notes

#### Why I took this approach
- I've worked on numerous projects with Ruby on Rails recently, so I feel comfortable creating an app with Rails.
  - This particular app did not utilize many Rails features, but I wanted to get up and running quickly, and I knew I could create a static page and add front-end javascript and CSS with Rails.
- The bulk of the app's code is in `app/assets/javascripts/application.js` file.
  - I add both individual map markers and cluster markers to their own layers, which the "cluster checkbox" toggles, so they map doesn't need to be re-created (only removing and adding layers).
  - I looked into some Leaflet tutorials and examples, which was especially helpful with figuring out colors for the choropleth map (I've altered the numbers to be more applicable to this project's data).
- I used [Leaflet](https://github.com/Leaflet/Leaflet), [Mapbox](https://www.mapbox.com/), and [Leaflet.markercluster plugin](https://github.com/Leaflet/Leaflet.markercluster) libraries to create the map, because they looked like the best the tools to build this app (documentation, recommendations, well maintained, etc.).
- The access token used for the Mapbox tile layer would usually be in an ENV file to hide sensitive information, but this is not a real concern for this app.
