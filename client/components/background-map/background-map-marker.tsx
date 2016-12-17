import * as React from 'react';
import IBackgroundMapMarkerProps from './i-background-map-marker-props';

import './background-map.scss';

class BackgroundMapMarker extends React.Component<IBackgroundMapMarkerProps, {}> {

  protected handleClick() {
    this.props.marker.onClick(this.props.marker.city);
  }

  render() {
    const style = Object.assign({}, this.props.style, {
      backgroundImage: `url('${this.props.marker.file.url()}')`,
    });

    return (
      <div className='background-map-marker' onClick={this.handleClick.bind(this)} style={style}></div>
    );
  }

}

export default BackgroundMapMarker;
