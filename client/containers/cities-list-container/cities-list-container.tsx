import * as React from 'react';
import { IStoresContext } from '../../components/root';
import { observer } from 'mobx-react';
import { Sidebar } from '../../components/sidebar';
// import * as Parse from 'parse';
import { City } from '../../api';

@observer
class CitiesListContainer extends React.Component<{}, {}> {

  static contextTypes = {
    personStore: React.PropTypes.object.isRequired,
    cityStore: React.PropTypes.object.isRequired,
    chatStore: React.PropTypes.object.isRequired,
  };

  context: IStoresContext;

  handleCityClick(city: City) {
    console.log(city);
    // this.context.personStore.selectCity(city);
  }

  renderItems() {
    return this.context.cityStore.cities
      .map(city => ({
        key: city.id,
        title: city.get('name'),
        onClick: this.handleCityClick.bind(this, city),
      }))
      .map(attribs => <button type='button' className='bs-list-group-item bs-list-group-item-action' {...attribs}>{attribs.title}</button>);
  }

  render() {
    if (this.context.cityStore.cities.length < 1)
      return null;

    return (
      <Sidebar>
        <div className='bs-list-group'>
          {this.renderItems()}
        </div>
      </Sidebar>
    );
  }

}

export default CitiesListContainer;
