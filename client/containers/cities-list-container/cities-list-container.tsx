import * as React from 'react';
import { IStoresContext } from '../../components/root';
import { observer } from 'mobx-react';
import { Sidebar } from '../../components/sidebar';
// import * as Parse from 'parse';
import { City } from '../../api';
import { UISref } from 'ui-router-react';
import { ListGroup, ListGroupItem } from '../../components/list-group';
import { Spinner } from '../../components/spinner';

@observer
class CitiesListContainer extends React.Component<{}, {}> {

  static contextTypes = {
    personStore: React.PropTypes.object.isRequired,
    cityStore: React.PropTypes.object.isRequired,
    chatStore: React.PropTypes.object.isRequired,
  };

  context: IStoresContext;

  renderList() {
    const items = this.context.cityStore.cities.map((city: City) => {
      return (
        <UISref key={city.id} to='root.city' params={{cityId: city.id}}>
          <ListGroupItem>{city.get('name')}</ListGroupItem>
        </UISref>
      );
    });

    return (
      <ListGroup>
        {items}
      </ListGroup>
    );
  }

  renderEmpty() {
    return (<div>Городов пока нет</div>);
  }

  renderSpinner() {
    return (<Spinner />);
  }

  render() {
    let content = null;

    if (this.context.cityStore.isFetching)
      content = this.renderSpinner();
    else if (this.context.cityStore.cities.length < 1)
      content = this.renderEmpty();
    else
      content = this.renderList();

    return (
      <Sidebar>
        {content}
      </Sidebar>
    );
  }

}

export default CitiesListContainer;
