import * as React from 'react';
import { IStoresContext } from '../../components/root';
import { observer } from 'mobx-react';
import { Sidebar, SidebarContent, SidebarFooter } from '../../components/sidebar';
// import * as Parse from 'parse';
import { Person } from '../../api';
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
    const items = this.context.cityStore.currentCityPeople.map((person: Person) => {
      return (
        <PersonItem
          key={person.id}
          nickname={person.get('nickname')}
          online={person.get('online')}
          lastSeen={person.get('lastSeen')}
        />
      );
    });

    return (
      <ListGroup>
        {items}
      </ListGroup>
    );
  }

  renderNoPeople() {
    return (<div>Никого онлайн</div>);
  }

  renderSpinner() {
    return (<Spinner />);
  }

  render() {
    let header = null;
    let content = null;

    if (!this.context.cityStore.isFetching && this.context.cityStore.currentCity)
      header = this.renderInfo();

    if (this.context.cityStore.isFetching)
      content = this.renderSpinner();
    else if (this.context.cityStore.currentCityPeople.length < 1)
      content = this.renderNoPeople();
    else
      content = this.renderList();

    return (
      <Sidebar>
        {header ? header : null}
        <SidebarContent>{content}</SidebarContent>
        <SidebarFooter />
      </Sidebar>
    );
  }

}

export default CityInfoContainer;
