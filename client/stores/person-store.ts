import { observable } from 'mobx';
import * as Parse from 'parse';
import { Person, City } from '../api';

class PersonStore {

  @observable people: Person[] = [];

  selectCity(city: City): void {
    (new Parse.Query(Person))
      .equalTo('city', city)
      .find()
      .then((people: Person[]) => {
        this.people = people;
      });
  }

}

export default PersonStore;
