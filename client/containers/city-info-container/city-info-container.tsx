import * as React from 'react';
import { IStoresContext } from '../../components/root';
import { observer } from 'mobx-react';
import { Sidebar } from '../../components/sidebar';
// import * as Parse from 'parse';
import { Person } from '../../api';

@observer
class CityInfoContainer extends React.Component<{}, {}> {

  static contextTypes = {
    personStore: React.PropTypes.object.isRequired,
    cityStore: React.PropTypes.object.isRequired,
    chatStore: React.PropTypes.object.isRequired,
  };

  context: IStoresContext;

  renderItems() {
    return this.context.cityStore.currentCityPeople
      .map((person: Person) => {
        return (
          <button key={person.id} type='button' className='bs-list-group-item'>{person.get('nickname')}</button>
        );
      });
  }

  render() {
    if (this.context.cityStore.currentCityPeople.length < 1)
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

export default CityInfoContainer;
