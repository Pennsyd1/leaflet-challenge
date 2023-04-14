// Creating the map object
let myMap = L.map("map", {
  center: [40.7, -73.95],
  zoom: 5
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Store the API query variables.
let URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Define color scale
let colors = ['blue', 'purple', 'navy', 'indigo', 'turquoise', 'teal'];

// Get the data with d3.
d3.json(URL).then(function(response) {

  // Loop through the features array.
  for (let i = 0; i < response.features.length; i++) {

    // Set the data properties to variables.
    let geometry = response.features[i].geometry;
    let magnitude = response.features[i].properties.mag;
    let depth = geometry.coordinates[2];

    // Check for the location property.
    if (geometry) {

      // Determine the radius based on the magnitude.
      let radius = Math.sqrt(Math.abs(magnitude)) * 25000;

      // Determine the fill color based on the magnitude.
      let color;
      if (magnitude >= 0 && magnitude < 1) {
        color = colors[0];
      } else if (magnitude >= 1 && magnitude < 2) {
        color = colors[1];
      } else if (magnitude >= 2 && magnitude < 3) {
        color = colors[2];
      } else if (magnitude >= 3 && magnitude < 4) {
        color = colors[3];
      } else if (magnitude >= 4 && magnitude < 5) {
        color = colors[4];
      } else {
        color = colors[5];
      }

      // Add a new circle to the map, and bind a popup.
      let circle = L.circle([geometry.coordinates[1], geometry.coordinates[0]], {
        color: 'white',
        fillColor: color,
        fillOpacity: 0.5,
        radius: radius 
      }).bindPopup(`<strong>Place:</strong> ${response.features[i].properties.place}<br><strong>Magnitude:</strong> ${magnitude}<br><strong>Depth:</strong> ${depth}`);
  
      // Add the circle to the map.
      circle.addTo(myMap);
    }
  }

  
});
