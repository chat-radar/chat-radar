import { observable } from 'mobx';
import * as Parse from 'parse';
import { City, Person } from '../api';

class CityStore {

  @observable cities: City[] = [];

  @observable currentCity: City = null;

  @observable currentCityPeople: Person[] = null;

  @observable isFetching: boolean = false;

  async fetchCities() {
    if (this.isFetching || this.cities.length > 0)
      return;

    this.isFetching = true;

    try {
      this.cities = await (new Parse.Query(City))
        .ascending('name')
        .matchesQuery('people', new Parse.Query(Person))
        .find();
    } catch (err) {
      console.error(err);
    }

    this.isFetching = false;
  }

  async selectCityById(id: string) {
    this.currentCity = this.cities.find((city: City) => city.id === id) || null;

    if (this.currentCity === null)
      return;

    this.isFetching = true;

    try {
      this.currentCityPeople = await this.currentCity.get('people').query().find();
    } catch (err) {
      console.error(err);
    }

    this.isFetching = false;
  }

}

export default CityStore;
