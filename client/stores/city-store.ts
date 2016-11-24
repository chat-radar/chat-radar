import { observable } from 'mobx';
import * as Parse from 'parse';
import { City } from '../api';

class CityStore {

  @observable cities: City[] = [];

  constructor() {
    const query = new Parse.Query(City);
    query.find().then((cities: City[]) => {
      this.cities = cities;
    });
  }

}

export default CityStore;
