/// <reference path='../../../typings/index.d.ts' />

import * as React from 'react';
import IMapContainerProps from './i-map-container-props';
import { observer } from 'mobx-react';
import { GeoPoint } from 'parse';
const { Map, Marker, TileLayer } = require('react-leaflet');

@observer
class MapContainer extends React.Component<IMapContainerProps, {}> {

  static zoom = 3;

  static center = [55.755833, 37.617778];

  renderPoints() {
    const { cityStore } = this.props.stores;

    return cityStore.cities.map((city, i) => {
      return (
        <Marker key={i} position={[(city.get('geo') as GeoPoint).latitude, (city.get('geo') as GeoPoint).longitude]} />
      );
    });
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
      <Map className='map' center={MapContainer.center} zoom={MapContainer.zoom}>
        {this.renderTiles()}
        {this.renderPoints()}
      </Map>
    );
  }

}

export default MapContainer;
