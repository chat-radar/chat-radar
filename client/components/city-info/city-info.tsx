import * as React from 'react';
import ICityInfoProps from './i-city-info-props';
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
        <div className='city-info-nav-panel'>

        </div>
        <h1>{this.splitName(this.props.name).city}</h1>
        <h5 className='text-muted'>{this.splitName(this.props.name).other}</h5>
      </div>
    );
  }

}

export default CityInfo;
