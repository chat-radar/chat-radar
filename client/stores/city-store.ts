import { observable } from 'mobx';
import * as Parse from 'parse';
import { City, Person } from '../api';

class CityStore {

  @observable cities: City[] = [];

  constructor() {
    (new Parse.Query(Person)).find().then((people: Person[]) => {
      return people.map(person => person.get('city'));
    }).then((cities: City[]) => {
      return (new Parse.Query(City))
        .ascending('name')
        .containedIn('objectId', cities.map(city => city.id))
        .find();
    }).then((cities: City[]) => {
      this.cities = cities;
    });
  }

}

export default CityStore;
