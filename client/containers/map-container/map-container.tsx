import * as React from 'react';
import IMapContainerProps from './i-map-container-props';
import { observer } from 'mobx-react';
import * as Parse from 'parse';
import * as L from 'leaflet';
const { Map, Marker, TileLayer } = require('react-leaflet');
import 'leaflet/dist/leaflet.css';
import './map-container.scss';

@observer
class MapContainer extends React.Component<IMapContainerProps, {}> {

  static zoom = 3;

  static center = [55.755833, 37.617778];

  renderPoints() {
    const { cityStore, chatStore } = this.props.stores;

    if (chatStore.chat === null)
      return null;

    const icon = L.icon({
      iconUrl: (chatStore.chat.get('marker') as Parse.File).url(),
    });

    return cityStore.cities
      .map(city => ({
        key: city.id,
        name: city.get('name'),
        position: [ (city.get('geo') as Parse.GeoPoint).latitude, (city.get('geo') as Parse.GeoPoint).longitude ],
        icon: icon,
      }))
      .map(attribs => <Marker {...attribs} />);
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
      <Map className='map-container' center={MapContainer.center} zoom={MapContainer.zoom} zoomControl={false}>
        {this.renderTiles()}
        {this.renderPoints()}
      </Map>
    );
  }

}

export default MapContainer;
