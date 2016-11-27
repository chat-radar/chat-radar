import * as React from 'react';
import IBackgroundMapProps from './i-background-map-props';
import * as L from 'leaflet';
const { Map, Marker, TileLayer, ZoomControl } = require('react-leaflet');
import { City } from '../../api';
import 'leaflet/dist/leaflet.css';
import './background-map.scss';

class BackgroundMap extends React.Component<IBackgroundMapProps, {}> {

  static zoom = 3;

  static center = [55.755833, 37.617778];

  static tilesUrl = 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png';
  // static tilesUrl = 'http://tiles.maps.sputnik.ru/{z}/{x}/{y}.png';

  static tilesAttribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>';

  protected onCityClick(city: City) {
    this.props.onCityClick(city);
  }

  renderPoints() {
    return this.props.cities
      .map(city => ({
        key: city.id,
        name: city.get('name'),
        position: {
          lat: parseInt(city.get('geo').latitude, 10),
          lon: parseInt(city.get('geo').longitude, 10),
        },
        icon: L.icon({ iconUrl: this.props.markerFile.url() }),
        onClick: this.onCityClick.bind(this, city),
      }))
      .map(attribs => <Marker {...attribs} />);
  }

  render() {
    return (
      <Map className='background-map' center={BackgroundMap.center} zoom={BackgroundMap.zoom} zoomControl={false}>
        <TileLayer url={BackgroundMap.tilesUrl} attribution={BackgroundMap.tilesAttribution} />
        <ZoomControl position='topright' />
        {this.renderPoints()}
      </Map>
    );
  }

}

export default BackgroundMap;
