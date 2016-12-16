import * as React from 'react';
import IBackgroundMapProps from './i-background-map-props';
import * as L from 'leaflet';
const { Map, Marker, TileLayer, ZoomControl } = require('react-leaflet');
import { City } from '../../api';
import 'leaflet/dist/leaflet.css';
import './background-map.scss';

class BackgroundMap extends React.Component<IBackgroundMapProps, {}> {

  static tilesUrl = 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png';
  // static tilesUrl = 'http://tiles.maps.sputnik.ru/{z}/{x}/{y}.png';

  static tilesAttribution = '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>';

  static zoom = 3;

  center = {
    lat: 55.755833,
    lon: 37.617778,
  };

  protected handleCityClick(city: City) {
    this.props.onCityClick(city);
  }

  protected getCenter() {
    if (this.props.currentCity) {
      this.center = {
        lat: parseFloat(this.props.currentCity.get('geo').latitude),
        lon: parseFloat(this.props.currentCity.get('geo').longitude),
      };
    }
    return this.center;
  }

  renderPoints() {
    return this.props.cities
      .map(city => ({
        key: city.id,
        name: city.get('name'),
        position: {
          lat: parseFloat(city.get('geo').latitude),
          lon: parseFloat(city.get('geo').longitude),
        },
        icon: L.icon({ iconUrl: this.props.markerFile.url() }),
        onClick: this.handleCityClick.bind(this, city),
      }))
      .map(attribs => <Marker {...attribs} />);
  }

  render() {
    return (
      <Map className='background-map' center={this.getCenter()} zoom={BackgroundMap.zoom} zoomControl={false}>
        <TileLayer url={BackgroundMap.tilesUrl} attribution={BackgroundMap.tilesAttribution} />
        <ZoomControl position='topright' />
        {this.renderPoints()}
      </Map>
    );
  }

}

export default BackgroundMap;
