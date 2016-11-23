/// <reference path='../../../typings/index.d.ts' />

import * as React from 'react';
const { Map, Marker, Popup, TileLayer } = require('react-leaflet');

class MapContainer extends React.Component<{}, {}> {

  protected zoom = 6;

  protected center = [50.257778, 127.536389];

  renderPoints() {
    return (
      <Marker position={this.center}>
        <Popup>
          <span>Благовещенск</span>
        </Popup>
      </Marker>
    );
  }

  renderTiles() {
    return (
        <TileLayer
          url='http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
    );
  }

  render() {
    return (
      <Map className='map' center={this.center} zoom={this.zoom}>
        {this.renderTiles()}
        {this.renderPoints()}
      </Map>
    );
  }

}

export default MapContainer;
