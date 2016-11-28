import * as React from 'react';
import { IStoresContext } from '../../components/root';
import { observer } from 'mobx-react';
import { Sidebar } from '../../components/sidebar';
// import * as Parse from 'parse';
import { City } from '../../api';
import { UISref } from 'ui-router-react';

@observer
class CitiesListContainer extends React.Component<{}, {}> {

  static contextTypes = {
    personStore: React.PropTypes.object.isRequired,
    cityStore: React.PropTypes.object.isRequired,
    chatStore: React.PropTypes.object.isRequired,
  };

  context: IStoresContext;

  renderItems() {
    return this.context.cityStore.cities
      .map((city: City) => {
        return (
          <UISref key={city.id} to='root.city' params={{cityId: city.id}}>
            <a className='bs-list-group-item'>{city.get('name')}</a>
          </UISref>
        );
      });
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
