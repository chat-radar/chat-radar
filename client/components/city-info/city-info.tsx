import * as React from 'react';
import ICityInfoProps from './i-city-info-props';
import ICityInfoState from './i-city-info-state';
import { UISref } from 'ui-router-react';
import * as moment from 'moment';
import { splitGrades } from '../../../utils';
import './city-info.scss';

class CityInfo extends React.Component<ICityInfoProps, ICityInfoState> {

  protected timer: number;

  constructor(props: ICityInfoProps) {
    super(props);

    this.state = {
      time: moment().utcOffset(props.timeZone),
    };
  }

  componentWillReceiveProps(props: ICityInfoProps) {
    this.setState({
      time: moment().utcOffset(props.timeZone)
    });
  }

  componentDidMount() {
    this.timer = setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  protected tick() {
    this.setState({ time: this.state.time.add(1, 's') });
  }

  protected renderProps() {
    let props = [];

    if (this.props.timeZone) {
      const time = this.state.time.format('HH:mm');
      props.push(<li key='timeZone' className='city-info-props-item'>Текущее время: {time}</li>);
    }
    if (this.props.inception) {
      const inceptionYear = this.props.inception.getUTCFullYear();
      props.push(<li key='inception' className='city-info-props-item'>Основание: {inceptionYear} г.</li>);
    }
    if (this.props.area) {
      const area = splitGrades(this.props.area);
      props.push(<li key='area' className='city-info-props-item'>Площадь: {area} км²</li>);
    }
    if (this.props.population) {
      const population = splitGrades(this.props.population);
      props.push(<li key='population' className='city-info-props-item'>Население: {population} чел.</li>);
    }

    if (props.length < 1)
      return null;

    return (
      <ul className='city-info-props text-muted'>
        {props}
      </ul>
    );
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
          <h1>{this.props.cityName}</h1>
          <h5 className='text-muted'>{this.props.fullName}</h5>
        </div>
        {this.renderProps()}
      </div>
    );
  }

}

export default CityInfo;
