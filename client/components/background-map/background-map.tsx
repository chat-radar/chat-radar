import * as React from 'react';
import IBackgroundMapProps from './i-background-map-props';
import IBackgroundMapState from './i-background-map-state';
import * as L from 'leaflet';
const { Map, Marker, TileLayer, ZoomControl } = require('react-leaflet');
import { City } from '../../api';
import 'leaflet/dist/leaflet.css';
import './background-map.scss';

class BackgroundMap extends React.Component<IBackgroundMapProps, IBackgroundMapState> {

  static tilesUrl = 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png';
  // static tilesUrl = 'http://tiles.maps.sputnik.ru/{z}/{x}/{y}.png';

  static tilesAttribution = '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>';

  protected map;

  constructor() {
    super();

    this.state = {
      center: {
        lat: 55.755833,
        lon: 37.617778,
      },
    };
  }

  protected handleCityClick(city: City) {
    this.props.onCityClick(city);
  }

  protected refMap(element: any) {
    if (this.map)
      return;
    this.map = element.leafletElement;
  }

  protected getCenter() {
    if (this.props.currentCity) {
      this.state.center = {
        lat: parseFloat(this.props.currentCity.get('geo').latitude),
        lon: parseFloat(this.props.currentCity.get('geo').longitude),
      };
    }
    return this.state.center;
  }

  protected getZoom() {
    if (this.map)
      return this.map.getZoom();
    return 3;
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
      <Map className='background-map' animate={true} center={this.getCenter()} zoom={this.getZoom()} zoomControl={false} ref={this.refMap.bind(this)}>
        <TileLayer url={BackgroundMap.tilesUrl} attribution={BackgroundMap.tilesAttribution} />
        <ZoomControl position='topright' />
        {this.renderPoints()}
      </Map>
    );
  }

}

export default BackgroundMap;
