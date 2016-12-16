import * as React from 'react';
import { IStoresContext } from '../../components/root';
import { observer } from 'mobx-react';
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter } from '../../components/sidebar';
import { City } from '../../api';
import { UISref } from 'ui-router-react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from '../../components/list-group';
import { Spinner } from '../../components/spinner';
import { splitAddress } from '../../../utils';

@observer
class CitiesListContainer extends React.Component<{}, {}> {

  static contextTypes = {
    personStore: React.PropTypes.object.isRequired,
    cityStore: React.PropTypes.object.isRequired,
    chatStore: React.PropTypes.object.isRequired,
  };

  context: IStoresContext;

  renderEmpty() {
    return (<div>Городов пока нет</div>);
  }

  renderSpinner() {
    return (<Spinner />);
  }

  renderList() {
    if (this.context.cityStore.isFetching || this.context.personStore.isFetching)
      return this.renderSpinner();

    const items = this.context.cityStore.cities.filter((city) => {
      for (let person of this.context.personStore.people)
        if (city.id === person.get('city').id)
          return true;
      return false;
    }).map((city: City) => {
      return (
        <UISref key={city.id} to='root.city' params={{cityId: city.id}}>
          <ListGroupItem>
            <ListGroupItemHeading>{splitAddress(city.get('name')).city}</ListGroupItemHeading>
            <ListGroupItemText><span className='text-muted'>{splitAddress(city.get('name')).other}</span></ListGroupItemText>
          </ListGroupItem>
        </UISref>
      );
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
        <SidebarContent>{this.renderList()}</SidebarContent>
        <SidebarFooter />
      </Sidebar>
    );
  }

}

export default CitiesListContainer;
