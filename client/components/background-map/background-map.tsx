import * as React from 'react';
import IBackgroundMapProps from './i-background-map-props';
import IBackgroundMapState from './i-background-map-state';
// import * as L from 'leaflet';
const { Map, TileLayer, ZoomControl } = require('react-leaflet');
import BackgroundMapMarker from './background-map-marker';
import { filterPeople } from '../../../utils';

import 'leaflet/dist/leaflet.css';
import './background-map.scss';

class BackgroundMap extends React.Component<IBackgroundMapProps, IBackgroundMapState> {

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

  protected renderMarkers() {
    return this.props.cities
      .map((city) => {
        const people = filterPeople(this.props.people, city);

        if (people.inCity.length < 1)
          return null;

        const key = city.id;
        const file = this.props.markerFile;
        const onClick = this.props.onCityClick;

        return { key, city, people, file, onClick };
      })
      .filter((marker) => {
        return !!marker;
      })
      .map((marker) => {
        return (<BackgroundMapMarker {...marker}/>);
      });
  }

  protected renderZoom() {
    return (<ZoomControl position='topright' />);
  }

  protected renderTiles() {
    return (
      <TileLayer
        url='http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>'
      />
    );
  }

  render() {
    return (
      <Map className='background-map' animate={true} center={this.getCenter()} zoom={this.getZoom()} zoomControl={false} ref={this.refMap.bind(this)}>
        {this.renderZoom()}
        {this.renderMarkers()}
        {this.renderTiles()}
      </Map>
    );
  }

}

export default BackgroundMap;
