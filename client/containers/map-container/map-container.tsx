import * as React from 'react';
import { IStoresContext } from '../../components/root';
import { observer } from 'mobx-react';
import { BackgroundMap } from '../../components/background-map';
// import * as Parse from 'parse';
import { City } from '../../api';

@observer
class MapContainer extends React.Component<{}, {}> {

  static contextTypes = {
    personStore: React.PropTypes.object.isRequired,
    cityStore: React.PropTypes.object.isRequired,
    chatStore: React.PropTypes.object.isRequired,
  };

  context: IStoresContext;

  onCityClick(city: City) {
    console.log(city);
    // this.context.personStore.selectCity(city);
  }

  render() {
    if (this.context.chatStore.currentChat === null)
      return null;
    if (this.context.cityStore.cities.length < 1)
      return null;

    return (
      <BackgroundMap
        cities={this.context.cityStore.cities}
        markerFile={this.context.chatStore.currentChat.get('marker')}
        onCityClick={this.onCityClick.bind(this)}
      />
    );
  }

}

export default MapContainer;
