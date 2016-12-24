import { observable, computed } from 'mobx';
import * as Parse from 'parse';
import PersonStore from './person-store';
import { City } from '../api';
import { filterPeople } from '../../utils';

class CityStore {

  protected personStore: PersonStore = null;

  @observable cities: City[] = [];

  @observable currentCity: City = null;

  @computed get currentCityPeople() {
    return filterPeople(this.personStore.people, this.currentCity);
  }

  @observable isFetching: boolean = false;

  constructor(personStore: PersonStore) {
    this.personStore = personStore;
  }

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
    await this.fetchCities();
    this.currentCity = this.cities.find((city: City) => city.id === id) || null;
  }

}

export default CityStore;
