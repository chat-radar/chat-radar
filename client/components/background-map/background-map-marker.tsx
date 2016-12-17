import * as React from 'react';
import IBackgroundMapMarkerProps from './i-background-map-marker-props';
import * as ReactTooltip from 'react-tooltip';
import { splitAddress } from '../../../utils';

import './background-map.scss';

class BackgroundMapMarker extends React.Component<IBackgroundMapMarkerProps, {}> {

  protected handleClick() {
    this.props.marker.onClick(this.props.marker.city);
  }

  render() {
    const id = 'background-map-marker-' + this.props.marker.city.id;

    const online = this.props.marker.people.filter((person) => person.get('online'));

    const style = Object.assign({}, this.props.style, {
      backgroundImage: `url('${this.props.marker.file.url()}')`,
    });

    return (
      <div className='background-map-marker' data-tip data-for={id} onClick={this.handleClick.bind(this)} style={style}>
        <ReactTooltip id={id} class='background-map-marker-tooltip'>
          <h5 className='background-map-marker-tooltip-title'>{splitAddress(this.props.marker.city.get('name')).city}</h5>
          <p className='background-map-marker-tooltip-description'>{ online.length ? `онлайн: ${online.length}` : 'никого онлайн' }</p>
        </ReactTooltip>
      </div>
    );
  }

}

export default BackgroundMapMarker;
