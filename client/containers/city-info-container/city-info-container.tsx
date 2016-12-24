import * as React from 'react';
import { IStoresContext } from '../../components/root';
import { observer } from 'mobx-react';
import { Sidebar, SidebarContent, SidebarFooter } from '../../components/sidebar';
// import * as Parse from 'parse';
import { ListGroup } from '../../components/list-group';
import { PersonItem } from '../../components/person-item';
import { CityInfo } from '../../components/city-info';
import { Spinner } from '../../components/spinner';
import { getCity } from '../../../utils';

@observer
class CityInfoContainer extends React.Component<{}, {}> {

  static contextTypes = {
    personStore: React.PropTypes.object.isRequired,
    cityStore: React.PropTypes.object.isRequired,
    chatStore: React.PropTypes.object.isRequired,
  };

  context: IStoresContext;

  renderInfo() {
    const city = this.context.cityStore.currentCity;

    return (
      <CityInfo
        cityName={getCity(city.get('address'), city.get('name'))}
        fullName={city.get('name')}
        photoUrl={city.get('photoUrl')}
        timeZone={city.get('timeZone')}
        inception={city.get('inception')}
        area={city.get('area')}
        population={city.get('population')}
      />
    );
  }

  renderList() {
    if (this.context.cityStore.isFetching || this.context.personStore.isFetching)
      return this.renderSpinner();

    if (!this.context.cityStore.currentCity)
      return this.renderNoCity();

    const items = this.context.cityStore.currentCityPeople.inCity.map((person) => {
      return (
        <PersonItem
          key={person.id}
          nickname={person.get('nickname')}
          online={person.get('online')}
          lastSeen={person.get('lastSeen')}
        />
      );
    });

    if (items.length < 1)
      return this.renderNoPeople();

    return (
      <ListGroup>
        {items}
      </ListGroup>
    );
  }

  renderNoCity() {
    return (<SidebarContent>Населенный пункт не найден</SidebarContent>);
  }

  renderNoPeople() {
    return (<SidebarContent>Никого онлайн</SidebarContent>);
  }

  renderSpinner() {
    return (<Spinner />);
  }

  render() {
    return (
      <Sidebar>
        {!this.context.cityStore.isFetching && this.context.cityStore.currentCity ? this.renderInfo() : null}
        {this.renderList()}
        <SidebarFooter />
      </Sidebar>
    );
  }

}

export default CityInfoContainer;
