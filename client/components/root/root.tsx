/// <reference path='../../../typings/index.d.ts' />

import React = require('react');
import RootProps = require('./root-props.d');
import RootState = require('./root-state.d');
const { Map, Marker, Popup, TileLayer } = require('react-leaflet');

class Root extends React.Component<RootProps, RootState> {

  protected position = [50.257778, 127.536389];

  renderPoints() {
    return (
      <Marker position={this.position}>
        <Popup>
          <span>Благовещенск</span>
        </Popup>
      </Marker>
    );
  }

  render() {
    return (
      <Map className='map' center={this.position} zoom={6}>
        <TileLayer
          url='http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {this.renderPoints()}
      </Map>
    );
  }

}

export = Root;
