import * as React from 'react';
import ICitiesListContainerProps from './i-cities-list-container-props';
import { observer, inject } from 'mobx-react';
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter } from '../../components/sidebar';
import { City } from '../../api';
import { UISref } from 'ui-router-react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from '../../components/list-group';
import { Spinner } from '../../components/spinner';
import * as moment from 'moment';
import { getCity, filterPeople } from '../../../utils';

@inject('chatStore')
@inject('cityStore')
@inject('personStore')
@observer
class CitiesListContainer extends React.Component<ICitiesListContainerProps, {}> {

  renderEmpty() {
    return (<SidebarContent>Городов пока нет</SidebarContent>);
  }

  renderSpinner() {
    return (<Spinner />);
  }

  renderList() {
    if (this.props.cityStore.isFetching || this.props.personStore.isFetching)
      return this.renderSpinner();

    const items = this.props.cityStore.cities.map((city: City) => {
      const people = filterPeople(this.props.personStore.people, this.props.chatStore.currentChat, city);

      if (people.inCity.length < 1)
        return null;

      const cityName = getCity(city.get('address'), city.get('name'));
      const onlineCount = people.online.length;
      const lastSeen = Math.max.apply(null, people.inCity.map(c => c.get('lastSeen') as number));

      return (
        <UISref key={city.id} to='.city' params={{cityId: city.id}}>
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
