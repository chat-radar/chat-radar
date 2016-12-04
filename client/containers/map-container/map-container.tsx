import * as React from 'react';
import { IStoresContext } from '../../components/root';
import { observer } from 'mobx-react';
import { BackgroundMap } from '../../components/background-map';
// import * as Parse from 'parse';
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
    if (this.context.chatStore.currentChat === null)
      return null;
    if (this.context.cityStore.cities.length < 1)
      return null;

    return (
      <BackgroundMap
        cities={this.context.cityStore.cities}
        currentCity={this.context.cityStore.currentCity}
        markerFile={this.context.chatStore.currentChat.get('marker')}
        onCityClick={this.handleCityClick.bind(this)}
      />
    );
  }

}

export default MapContainer;
