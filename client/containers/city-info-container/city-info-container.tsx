import * as React from 'react';
import { IStoresContext } from '../../components/root';
import { observer } from 'mobx-react';
import { Sidebar, SidebarContent, SidebarFooter } from '../../components/sidebar';
// import * as Parse from 'parse';
import { ListGroup } from '../../components/list-group';
import { PersonItem } from '../../components/person-item';
import { CityInfo } from '../../components/city-info';
import { Spinner } from '../../components/spinner';

@observer
class CityInfoContainer extends React.Component<{}, {}> {

  static contextTypes = {
    personStore: React.PropTypes.object.isRequired,
    cityStore: React.PropTypes.object.isRequired,
    chatStore: React.PropTypes.object.isRequired,
  };

  context: IStoresContext;

  renderInfo() {
    return (
      <CityInfo
        name={this.context.cityStore.currentCity.get('name')}
        photoUrl={this.context.cityStore.currentCity.get('photoUrl')}
      />
    );
  }

  renderList() {
    if (this.context.cityStore.isFetching || this.context.personStore.isFetching)
      return this.renderSpinner();

    if (!this.context.cityStore.currentCity)
      return this.renderNoCity();

    const items = this.context.personStore.people.filter((person) => {
      if (person.get('city').id === this.context.cityStore.currentCity.id)
        return true;
      return false;
    }).map((person) => {
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
