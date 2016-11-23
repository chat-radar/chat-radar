/// <reference path='../../../typings/index.d.ts' />

import * as React from 'react';
import IMapContainerProps from './i-map-container-props';
import { observer } from 'mobx-react';
const { Map, Marker, Popup, TileLayer } = require('react-leaflet');

@observer
class MapContainer extends React.Component<IMapContainerProps, {}> {

  static zoom = 6;

  static center = [50.257778, 127.536389];

  renderPoints() {
    const { cityStore } = this.props.stores;

    return cityStore.map((city, i) => {
      return (
        <Marker key={i} position={[city.geo[0], city.geo[1]]}>
          <Popup>
            <span>{city.name}</span>
          </Popup>
        </Marker>
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
