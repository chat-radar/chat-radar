import { observable } from 'mobx';
import * as Parse from 'parse';
import { City } from '../api';

class CityStore {

  @observable cities: City[] = [];

  @observable currentCity: City = null;

  @observable isFetching: boolean = false;

  async fetchCities() {
    if (this.isFetching || this.cities.length > 0)
      return;

    this.isFetching = true;

    try {
      this.cities = await (new Parse.Query(City))
        .ascending('name')
        .find();
    } catch (err) {
      console.error(err);
    }

    this.isFetching = false;
  }

  async selectCityById(id: string) {
    this.currentCity = this.cities.find((city: City) => city.id === id) || null;
  }

}

export default CityStore;
