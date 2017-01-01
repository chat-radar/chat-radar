import { observable } from 'mobx';
import * as Parse from 'parse';
import { Person } from '../api';

class PersonStore {

  protected query: Parse.Query;

  protected subscription;

  @observable people: Person[] = [];

  @observable isFetching: boolean = false;

  constructor() {
    this.query = new Parse.Query(Person).limit(1000);
    this.fetchPeople();
    this.subscribe();
  }

  protected async fetchPeople() {
    console.log('Fetching people...');

    this.isFetching = true;

    try {
      this.people = await this.query.find();
    } catch (err) {
      console.error(err);
    }

    this.isFetching = false;
  }

  protected subscribe() {
    this.subscription = (<any>this.query).subscribe();

    this.subscription.on('open', () => console.log('Started people subscriber'));
    this.subscription.on('create', () => this.fetchPeople());
    this.subscription.on('update', () => this.fetchPeople());
    this.subscription.on('delete', () => this.fetchPeople());
  }

}

export default PersonStore;
