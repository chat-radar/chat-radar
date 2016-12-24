import { observable, computed } from 'mobx';
import * as Parse from 'parse';
import PersonStore from './person-store';
import { City } from '../api';
import { filterPeople } from '../../utils';

class CityStore {

  protected query: Parse.Query;

  protected subscription;

  protected personStore: PersonStore = null;

  @observable cities: City[] = [];

  @observable currentCityId: string = null;

  @computed get currentCity() {
    if (!this.currentCityId || this.cities.length < 1)
      return null;
    return this.cities.find((city: City) => city.id === this.currentCityId) || null;
  };

  @computed get currentCityPeople() {
    return filterPeople(this.personStore.people, this.currentCity);
  }

  @observable isFetching: boolean = false;

  constructor(personStore: PersonStore) {
    this.personStore = personStore;

    this.query = new Parse.Query(City)
      .ascending('name');
    this.fetchCities();
    this.subscribe();
  }

  protected async fetchCities() {
    console.log('Fetching cities...');

    this.isFetching = true;

    try {
      this.cities = await this.query.find();
    } catch (err) {
      console.error(err);
    }

    this.isFetching = false;
  }

  protected subscribe() {
    this.subscription = (<any>this.query).subscribe();

    this.subscription.on('open', () => console.log('Started cities subscriber'));
    this.subscription.on('create', () => this.fetchCities());
    this.subscription.on('update', () => this.fetchCities());
    this.subscription.on('delete', () => this.fetchCities());
  }

  async selectCityById(id: string) {
    this.currentCityId = id;
  }

}

export default CityStore;
