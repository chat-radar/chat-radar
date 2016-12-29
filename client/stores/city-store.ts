import { observable, computed } from 'mobx';
import * as Parse from 'parse';
import PersonStore from './person-store';
import ChatStore from './chat-store';
import { City } from '../api';
import { filterPeople } from '../../utils';

class CityStore {

  protected query: Parse.Query;

  protected subscription;

  protected personStore: PersonStore = null;

  protected chatStore: ChatStore = null;

  @observable cities: City[] = [];

  @observable protected currentCityId: string = null;

  @computed get currentCity() {
    if (!this.currentCityId || this.cities.length < 1)
      return null;
    return this.cities.find((city: City) => city.id === this.currentCityId) || null;
  };

  @computed get currentCityPeople() {
    return filterPeople(this.personStore.people, this.chatStore.currentChat, this.currentCity);
  }

  @observable isFetching: boolean = false;

  constructor(personStore: PersonStore, chatStore: ChatStore) {
    this.personStore = personStore;
    this.chatStore = chatStore;

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
