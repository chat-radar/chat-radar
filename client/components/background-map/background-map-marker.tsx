import * as React from 'react';
import IBackgroundMapMarkerProps from './i-background-map-marker-props';
import * as ReactTooltip from 'react-tooltip';
import DivIcon from 'react-leaflet-div-icon';
import { splitAddress } from '../../../utils';

import './background-map.scss';

class BackgroundMapMarker extends React.Component<IBackgroundMapMarkerProps, {}> {

  protected handleClick() {
    this.props.onClick(this.props.city);
  }

  render() {
    const id = 'background-map-marker-' + this.props.city.id;
    const backgroundImage = `url('${this.props.file.url()}')`;
    const online = this.props.people.filter((person) => person.get('online'));
    const position = {
      lat: parseFloat(this.props.city.get('geo').latitude),
      lon: parseFloat(this.props.city.get('geo').longitude),
    };

    return (
      <DivIcon position={position} className='background-map-marker-wrap'>
        <div className='background-map-marker' data-tip data-for={id} onClick={this.handleClick.bind(this)} style={{backgroundImage}}>
          <ReactTooltip id={id} class='background-map-marker-tooltip'>
            <h5 className='background-map-marker-tooltip-title'>{splitAddress(this.props.city.get('name')).city}</h5>
            <p className='background-map-marker-tooltip-description'>{ online.length ? `онлайн: ${online.length}` : 'никого онлайн' }</p>
          </ReactTooltip>
        </div>
      </DivIcon>
    );
  }

}

export default BackgroundMapMarker;
