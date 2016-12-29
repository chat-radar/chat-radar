import * as React from 'react';
import IBackgroundMapMarkerProps from './i-background-map-marker-props';
import * as ReactTooltip from 'react-tooltip';
import DivIcon from 'react-leaflet-div-icon';
import * as classnames from 'classnames';
import { getCity } from '../../../utils';

import './background-map.scss';

class BackgroundMapMarker extends React.Component<IBackgroundMapMarkerProps, {}> {

  protected handleClick() {
    this.props.onClick(this.props.city);
  }

  render() {
    const id = 'background-map-marker-' + this.props.city.id;
    const position = {
      lat: parseFloat(this.props.city.get('geo').latitude),
      lon: parseFloat(this.props.city.get('geo').longitude),
    };
    const backgroundImage = this.props.file ? `url('${this.props.file.url()}')` : null;
    const title = getCity(this.props.city.get('address'), this.props.city.get('name'));
    const onlineCount = this.props.people.online.length;

    return (
      <DivIcon position={position} className='background-map-marker-wrap'>
        <div
          className={classnames({'background-map-marker': true, 'background-map-marker-online': !!onlineCount, 'background-map-marker-offline': !onlineCount})}
          onClick={this.handleClick.bind(this)}
          data-tip
          data-for={id}
        >
          <div className='background-map-marker-icon' style={{backgroundImage}}></div>
          <ReactTooltip id={id} class='background-map-marker-tooltip'>
            <h5 className='background-map-marker-tooltip-title'>{title}</h5>
            <p className='background-map-marker-tooltip-description'>{ onlineCount ? `${onlineCount} онлайн` : 'никого онлайн' }</p>
          </ReactTooltip>
        </div>
      </DivIcon>
    );
  }

}

export default BackgroundMapMarker;
