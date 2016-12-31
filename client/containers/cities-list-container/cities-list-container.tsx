import * as React from 'react';
import ICitiesListContainerProps from './i-cities-list-container-props';
import { observer, inject } from 'mobx-react';
import { Sidebar, SidebarHeader, SidebarHeaderRow, SidebarHeaderCol, SidebarContent, SidebarFooter } from '../../components/sidebar';
import { City } from '../../api';
import { UISref } from 'ui-router-react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from '../../components/list-group';
import { Spinner } from '../../components/spinner';
import { MainMenu } from '../../components/main-menu';
import * as moment from 'moment';
import { getCity, filterPeople } from '../../../utils';

@inject('chatStore')
@inject('cityStore')
@inject('personStore')
@observer
class CitiesListContainer extends React.Component<ICitiesListContainerProps, {}> {

  protected renderDescription() {
    if (this.props.chatStore.currentChat === null || !this.props.chatStore.currentChat.get('description'))
      return null;
    return (<SidebarContent>{this.props.chatStore.currentChat.get('description')}</SidebarContent>);
  }

  protected renderEmpty() {
    return (<SidebarContent>Городов пока нет</SidebarContent>);
  }

  protected renderSpinner() {
    return (<Spinner />);
  }

  protected renderList() {
    if ((this.props.cityStore.cities.length < 1 && this.props.cityStore.isFetching)
     || (this.props.personStore.people.length < 1 && this.props.personStore.isFetching))
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
        <SidebarHeader>
          <SidebarHeaderRow>
            <SidebarHeaderCol>
              <UISref to='^'>
                <a className='sidebar-header-nav-link fa fa-2x fa-angle-left' />
              </UISref>
            </SidebarHeaderCol>
            <SidebarHeaderCol expand={true}>
              <h1>Chat Radar</h1>
            </SidebarHeaderCol>
            <SidebarHeaderCol>
              <MainMenu />
            </SidebarHeaderCol>
          </SidebarHeaderRow>
        </SidebarHeader>
        {this.renderDescription()}
        {this.renderList()}
        <SidebarFooter />
      </Sidebar>
    );
  }

}

export default CitiesListContainer;
