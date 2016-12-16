import { observable } from 'mobx';
import * as Parse from 'parse';
import { Person } from '../api';

class PersonStore {

  @observable people: Person[] = [];

  @observable isFetching: boolean = false;

  async fetchPeople() {
    if (this.isFetching || this.people.length > 0)
      return;

    this.isFetching = true;

    try {
      this.people = await (new Parse.Query(Person))
        .find();
    } catch (err) {
      console.error(err);
    }

    this.isFetching = false;
  }

}

export default PersonStore;
