import * as React from 'react';
import { IStoresContext } from '../../components/root';
import { observer } from 'mobx-react';
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter } from '../../components/sidebar';
// import * as Parse from 'parse';
import { Person } from '../../api';
import { ListGroup, ListGroupItem } from '../../components/list-group';
import { Spinner } from '../../components/spinner';

@observer
class CityInfoContainer extends React.Component<{}, {}> {

  static contextTypes = {
    personStore: React.PropTypes.object.isRequired,
    cityStore: React.PropTypes.object.isRequired,
    chatStore: React.PropTypes.object.isRequired,
  };

  context: IStoresContext;

  renderList() {
    const items = this.context.cityStore.currentCityPeople.map((person: Person) => {
      return (
        <ListGroupItem key={person.id}>{person.get('nickname')}</ListGroupItem>
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

    if (!this.context.cityStore.isFetching)
      header = (<h1>{this.context.cityStore.currentCity.get('name')}</h1>);

    if (this.context.cityStore.isFetching)
      content = this.renderSpinner();
    else if (this.context.cityStore.currentCityPeople.length < 1)
      content = this.renderNoPeople();
    else
      content = this.renderList();

    return (
      <Sidebar>
        {header ? (<SidebarHeader>{header}</SidebarHeader>) : null}
        <SidebarContent>{content}</SidebarContent>
        <SidebarFooter />
      </Sidebar>
    );
  }

}

export default CityInfoContainer;
