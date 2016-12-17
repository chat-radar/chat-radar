import * as React from 'react';
import IBackgroundMapProps from './i-background-map-props';
import IBackgroundMapState from './i-background-map-state';
// import * as L from 'leaflet';
const { Map, TileLayer, ZoomControl } = require('react-leaflet');
import MarkerLayer from 'react-leaflet-marker-layer';
import BackgroundMapMarker from './background-map-marker';

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

  protected getMarkers() {
    return this.props.cities.map((city) => ({
      city: city,
      file: this.props.markerFile,
      onClick: this.props.onCityClick,
    }));
  }

  render() {
    return (
      <Map className='background-map' animate={true} center={this.getCenter()} zoom={this.getZoom()} zoomControl={false} ref={this.refMap.bind(this)}>
        <ZoomControl
          position='topright'
        />
        <MarkerLayer
          markers={this.getMarkers()}
          markerComponent={BackgroundMapMarker}
          latitudeExtractor={m => parseFloat(m.city.get('geo').latitude)}
          longitudeExtractor={m => parseFloat(m.city.get('geo').longitude)}
        />
        <TileLayer
          url={BackgroundMap.tilesUrl}
          attribution={BackgroundMap.tilesAttribution}
        />
      </Map>
    );
  }

}

export default BackgroundMap;
