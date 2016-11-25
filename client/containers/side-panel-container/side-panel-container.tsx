import * as React from 'react';
import ISidePanelContainerProps from './i-side-panel-container-props';
import { observer } from 'mobx-react';
// import * as Parse from 'parse';
import { City } from '../../api';
import './side-panel-container.scss';

@observer
class SidePanelContainer extends React.Component<ISidePanelContainerProps, {}> {

  handleCityClick(city: City) {
    const { personStore } = this.props.stores;
    personStore.selectCity(city);
  }

  renderList() {
    const { cityStore, personStore } = this.props.stores;

    if (personStore.people.length > 0) {
      return (
        <ul className='bs-list-group'>
          {personStore.people.map(person => <li key={person.id} className='bs-list-group-item'>{person.get('nickname')}</li>)}
        </ul>
      );
    } else {
      return (
        <div className='bs-list-group'>
          {cityStore.cities.map(city => <button onClick={this.handleCityClick.bind(this, city)} key={city.id} type='button' className='bs-list-group-item bs-list-group-item-action'>{city.get('name')}</button>)}
        </div>
      );
    }
  }

  renderFooter() {
    return (
      <div>
        Размещено на хостинге <a href='http://www.vultr.com/?ref=6842617' target='_blank'>Vultr</a>
      </div>
    );
  }

  render() {
    return (
      <div className='side-panel-container'>
        <div className='side-panel-container-content'>
          {this.renderList()}
        </div>
        <div className='side-panel-container-footer'>
          {this.renderFooter()}
        </div>
      </div>
    );
  }

}

export default SidePanelContainer;
