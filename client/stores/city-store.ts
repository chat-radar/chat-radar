import { observable } from 'mobx';
import * as Parse from 'parse';
import { City } from '../api';

class CityStore {

  @observable cities: City[] = [];

  constructor() {
    (new Parse.Query(City)).find().then((cities: City[]) => {
      this.cities = cities;
    });
  }

}

export default CityStore;
