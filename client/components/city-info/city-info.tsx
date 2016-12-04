import * as React from 'react';
import ICityInfoProps from './i-city-info-props';
import { UISref } from 'ui-router-react';
import './city-info.scss';

class CityInfo extends React.Component<ICityInfoProps, {}> {

  splitName(name: string) {
    const parts = name.split(', ');

    const city = parts.shift();
    const other = parts.join(', ');

    return { city, other };
  }

  render() {
    return (
      <div className='city-info' style={{backgroundImage: this.props.photoUrl ? `url(${this.props.photoUrl})` : null }}>
        <div className='city-info-nav'>
          <UISref to='root.cities'>
            <a className='city-info-nav-link fa fa-2x fa-angle-left' />
          </UISref>
        </div>
        <div className='city-info-header'>
          <h1>{this.splitName(this.props.name).city}</h1>
          <h5 className='text-muted'>{this.splitName(this.props.name).other}</h5>
        </div>
      </div>
    );
  }

}

export default CityInfo;
