/// <reference path='../../../typings/index.d.ts' />

import React = require('react');
import RootProps = require('./root-props.d');
import RootState = require('./root-state.d');
// const { Map, Marker, Popup, TileLayer } = require('react-leaflet');

class Root extends React.Component<RootProps, RootState> {

  render() {
    return (
      <h1>It works! Yeah!</h1>
    );
  }

}

export = Root;
