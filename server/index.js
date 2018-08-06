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

app.listen(3000, () => console.log('Example app listening on port 3000!'))
