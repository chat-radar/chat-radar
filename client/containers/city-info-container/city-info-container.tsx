import * as React from 'react';
import ICityInfoContainerProps from './i-cities-list-container-props';
import { observer, inject } from 'mobx-react';
import { UISref } from 'ui-router-react';
import { Sidebar, SidebarHeader, SidebarHeaderRow, SidebarHeaderCol, SidebarContent, SidebarFooter } from '../../components/sidebar';
import { MainMenu } from '../../components/main-menu';
import { ListGroup } from '../../components/list-group';
import { PersonItem } from '../../components/person-item';
import { CityInfo } from '../../components/city-info';
import { Spinner } from '../../components/spinner';
import { getCity } from '../../../utils';

@inject('chatStore')
@inject('cityStore')
@inject('personStore')
@observer
class CityInfoContainer extends React.Component<ICityInfoContainerProps, {}> {

  renderInfo() {
    const city = this.props.cityStore.currentCity;

    return (
      <CityInfo
        cityName={getCity(city.get('address'), city.get('name'))}
        fullName={city.get('name')}
        photoUrl={city.get('photoUrl')}
        timeZone={city.get('timeZone')}
        inception={city.get('inception')}
        area={city.get('area')}
        population={city.get('population')}
      >
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
      </CityInfo>
    );
  }

  renderList() {
    if ((this.props.cityStore.cities.length < 1 && this.props.cityStore.isFetching)
     || (this.props.personStore.people.length < 1 && this.props.personStore.isFetching))
      return this.renderSpinner();

    if (!this.props.cityStore.currentCity)
      return this.renderNoCity();

    const items = this.props.cityStore.currentCityPeople.inCity.map((person) => {
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
        {!this.props.cityStore.isFetching && this.props.cityStore.currentCity ? this.renderInfo() : null}
        {this.renderList()}
        <SidebarFooter />
      </Sidebar>
    );
  }

}

export default CityInfoContainer;
