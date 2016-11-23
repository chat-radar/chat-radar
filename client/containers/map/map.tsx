/// <reference path='../../../typings/index.d.ts' />

import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { testAction } from '../../actions';
const Leaflet = require('react-leaflet');

interface IMapProps {
  message: string;
  testAction(message: string);
}

@connect(state => ({
  message: state.test.message,
}), dispatch => {
  return bindActionCreators({ testAction }, dispatch);
})
class Map extends React.Component<IMapProps, any> {

  static center = [55.755833, 37.617778];

  static zoom = 3;

  renderPoints() {
    return (
      <Leaflet.Marker position={Map.center}>
        <Leaflet.Popup>
          <span>Благовещенск</span>
        </Leaflet.Popup>
      </Leaflet.Marker>
    );
  }

  renderTiles() {
    return (
      <Leaflet.TileLayer
        url='http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png'
        attribution='&copy; <a target="_blank" href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a target="_blank" href="https://carto.com/attributions">CARTO</a>'
      />
    );
  }

  handleTest() {
    this.props.testAction('lol ' + Math.random());
  }

  renderTest() {
    return (
      <button onClick={ this.handleTest.bind(this) } type='button'>{ this.props.message || 'Test' }</button>
    );
  }

  render() {
    return this.renderTest();
    // return (
    //   <Leaflet.Map className='map' center={Map.center} zoom={Map.zoom}>
    //     {this.renderTiles()}
    //   </Leaflet.Map>
    // );
  }

}

export default Map;
