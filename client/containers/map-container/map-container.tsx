import * as React from 'react';
import IMapContainerProps from './i-map-container-props';
import { observer, inject } from 'mobx-react';
import { BackgroundMap } from '../../components/background-map';
import { City } from '../../api';
import * as app from '../../../lib/application';
import UIRouterReact from 'ui-router-react';
const router: UIRouterReact = app.get('router');

@inject('chatStore')
@inject('cityStore')
@inject('personStore')
@observer
class MapContainer extends React.Component<IMapContainerProps, {}> {

  handleCityClick(city: City) {
    router.stateService.go('chats.cities.city', { cityId: city.id });
  }

  render() {
    const cities = this.props.cityStore.cities;
    const people = this.props.personStore.people;
    const currentCity = this.props.cityStore.currentCity;
    const currentChat = this.props.chatStore.currentChat;

    return (
      <BackgroundMap
        cities={cities}
        people={people}
        currentCity={currentCity}
        currentChat={currentChat}
        onCityClick={this.handleCityClick.bind(this)}
      />
    );
  }

}

export default MapContainer;
