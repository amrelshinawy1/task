import React from 'react';

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Loading...',
      coordinates: [0, 0],
    };
  }
  componentDidMount() {

    fetch('http://localhost:3000')
      .then(response => response.json())
      .then((json) => {
        const { properties, geometry } = json;

        this.setState({
          name: properties.name,
          coordinates: geometry.coordinates,
        });
        const osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        const attribution = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
        const osm = new L.TileLayer(osmUrl, {
          minZoom: 8,
          maxZoom: 12,
          attribution,
        });
        this.map = new L.Map('mapid');
        var mymap = this.map.setView(new L.LatLng(52.51, 13.40), 9);
        var marker = L.marker([this.state.coordinates[1], this.state.coordinates[0]]).addTo(mymap);
        marker.bindPopup("<b>Here is the first gas station</b>").openPopup();
        this.map.addLayer(osm);

        function onMapClick(e) {
          fetch(`http://localhost:3000/getNearest/?lat=${e.latlng.lat + '&lng=' + e.latlng.lng}`)
            .then(response => response.json())
            .then((json) => {
              const { properties, geometry } = json.nearest.station;
              const distant = json.closest_distance.toFixed(2);
              var marker = L.marker([geometry.coordinates[1], geometry.coordinates[0]]).addTo(mymap);
              marker.bindPopup(`<b>Here is the nearest gas station ${properties.name} is away from here ${distant} meter </b>`).openPopup();
            });
        }
        mymap.on('click', onMapClick);
      });

  }
  render() {
    return (
      <div>
        Name: {this.state.name}<br />
        {this.state.coordinates[1]} {this.state.coordinates[0]}
        <div id="mapid"></div>
      </div>);
  }
};

export default MapComponent;
