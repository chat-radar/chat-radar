import * as React from 'react';
import { IStoresContext } from '../../components/root';
import { observer } from 'mobx-react';
import { BackgroundMap } from '../../components/background-map';
import { City } from '../../api';
import * as app from '../../../lib/application';
import UIRouterReact from 'ui-router-react';
const router: UIRouterReact = app.get('router');

@observer
class MapContainer extends React.Component<{}, {}> {

  static contextTypes = {
    personStore: React.PropTypes.object.isRequired,
    cityStore: React.PropTypes.object.isRequired,
    chatStore: React.PropTypes.object.isRequired,
  };

  context: IStoresContext;

  handleCityClick(city: City) {
    router.stateService.go('root.city', { cityId: city.id });
  }

  render() {
    if (this.context.chatStore.currentChat === null
     || this.context.cityStore.cities.length < 1
     || this.context.personStore.people.length < 1)
      return null;

    // const cities = this.context.cityStore.cities.filter((city) => {
    //   for (let person of this.context.personStore.people)
    //     if (city.id === person.get('city').id)
    //       return true;
    //   return false;
    // });

    const cities = this.context.cityStore.cities;
    const people = this.context.personStore.people;
    const currentCity = this.context.cityStore.currentCity;
    const markerFile = this.context.chatStore.currentChat.get('marker');

    return (
      <BackgroundMap
        cities={cities}
        people={people}
        currentCity={currentCity}
        markerFile={markerFile}
        onCityClick={this.handleCityClick.bind(this)}
      />
    );
  }

}

export default MapContainer;
