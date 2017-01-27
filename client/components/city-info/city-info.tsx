import * as React from 'react';
import ICityInfoProps from './i-city-info-props';
import ICityInfoState from './i-city-info-state';
// import { UISref } from 'ui-router-react';
import * as moment from 'moment';
import { splitGrades } from '../../../utils';
import './city-info.scss';

class CityInfo extends React.Component<ICityInfoProps, ICityInfoState> {

  protected timer: number;

  constructor(props: ICityInfoProps) {
    super(props);

    let time = props.timeZone ? moment().utcOffset(props.timeZone) : null;
    this.state = { time };
  }

  componentWillReceiveProps(props: ICityInfoProps) {
    let time = props.timeZone ? moment().utcOffset(props.timeZone) : null;
    this.setState({ time });
  }

  componentDidMount() {
    this.timer = setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  protected tick() {
    if (!this.props.timeZone)
      return;

    let time = this.state.time.add(1, 's');
    this.setState({ time });
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
      <div className='city-info' style={{backgroundImage: this.props.photoUrl ? `url(${this.props.photoUrl}?width=640)` : null }}>
        {this.props.children ? <div className='city-info-header'>{this.props.children}</div> : null}
        <div className='city-info-content'>
          <div className='city-info-title'>
            <h1>{this.props.cityName}</h1>
            <h5 className='text-muted'>{this.props.fullName}</h5>
          </div>
          {this.renderProps()}
        </div>
      </div>
    );
  }

}

export default CityInfo;
