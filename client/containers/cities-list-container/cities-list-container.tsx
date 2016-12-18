import * as React from 'react';
import { IStoresContext } from '../../components/root';
import { observer } from 'mobx-react';
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter } from '../../components/sidebar';
import { City } from '../../api';
import { UISref } from 'ui-router-react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from '../../components/list-group';
import { Spinner } from '../../components/spinner';
import * as moment from 'moment';
import { getCity, filterPeople } from '../../../utils';

@observer
class CitiesListContainer extends React.Component<{}, {}> {

  static contextTypes = {
    personStore: React.PropTypes.object.isRequired,
    cityStore: React.PropTypes.object.isRequired,
    chatStore: React.PropTypes.object.isRequired,
  };

  context: IStoresContext;

  renderEmpty() {
    return (<SidebarContent>Городов пока нет</SidebarContent>);
  }

  renderSpinner() {
    return (<Spinner />);
  }

  renderList() {
    if (this.context.cityStore.isFetching || this.context.personStore.isFetching)
      return this.renderSpinner();

    const items = this.context.cityStore.cities.map((city: City) => {
      const people = filterPeople(this.context.personStore.people, city);

      if (people.inCity.length < 1)
        return null;

      const cityName = getCity(city.get('address'), city.get('name'));
      const onlineCount = people.online.length;
      const lastSeen = Math.max.apply(null, people.inCity.map(c => c.get('lastSeen') as number));

      return (
        <UISref key={city.id} to='root.city' params={{cityId: city.id}}>
          <ListGroupItem>
            <ListGroupItemHeading>{cityName}</ListGroupItemHeading>
            <ListGroupItemText>
              <span className='text-muted'>{ onlineCount ? `${onlineCount} онлайн` : `никого онлайн, последняя активность была ${moment(lastSeen).toNow(true)} назад` }</span>
            </ListGroupItemText>
          </ListGroupItem>
        </UISref>
      );
    }).filter((city) => {
      return !!city;
    });

    if (items.length < 1)
      return this.renderEmpty();

    return (
      <ListGroup>
        {items}
      </ListGroup>
    );
  }

  render() {

    return (
      <Sidebar>
        <SidebarHeader />
        {this.renderList()}
        <SidebarFooter />
      </Sidebar>
    );
  }

}

export default CitiesListContainer;
