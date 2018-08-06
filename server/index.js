const express = require('express')
const app = express()

const fuelStations = require('./fuelstations.json').features;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  // TODO implement first server.
  console.log('sending');
  res.send(fuelStations[0])
})
app.get('/getNearest', (req, res) => {
  var currentlat = req.query.lat;
  var currentlng = req.query.lng;
  let currentCoordinates = { lng: currentlng, lat: currentlat };
  let arrayOfCoordinates = fuelStations.map(function (station) { return { lng: station.geometry.coordinates[0], lat: station.geometry.coordinates[1], station: station }; });
  var nearest = arrayOfCoordinates[0];
  var closest_distance = distance(nearest, currentCoordinates);
  for (var i = 1; i < arrayOfCoordinates.length; i++) {
    if (distance(arrayOfCoordinates[i], currentCoordinates) < closest_distance) {
      closest_distance = distance(arrayOfCoordinates[i], currentCoordinates);
      nearest = arrayOfCoordinates[i];
    }
  }
  res.send(nearest)
})
//To find distance between 2 points using (Haversine formula):
function distance(position1, position2) {
  var lat1 = position1.lat;
  var lat2 = position2.lat;
  var lon1 = position1.lng;
  var lon2 = position2.lng;
  var R = 6371000; // Radius of the earth in meters

  var φ1 = toRad(lat1);
  var φ2 = toRad(lat2);
  var Δφ = toRad(lat2 - lat1);
  var Δλ = toRad(lon2 - lon1);

  var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var d = R * c;
  return d;
}
function toRad(Value) {
  return Value * Math.PI / 180;
}
app.listen(3000, () => console.log('Example app listening on port 3000!'))
