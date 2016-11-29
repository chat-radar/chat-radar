import { observable } from 'mobx';
import * as Parse from 'parse';
import { City, Person } from '../api';

class CityStore {

  @observable cities: City[] = [];

  @observable currentCity: City = null;

  @observable currentCityPeople: Person[] = [];

  @observable isFetching: boolean = false;

  constructor() {
    this.isFetching = true;
    (new Parse.Query(Person)).find().then((people: Person[]) => {
      return people.map(person => person.get('city'));
    }).then((cities: City[]) => {
      return (new Parse.Query(City))
        .ascending('name')
        .containedIn('objectId', cities.map(city => city.id))
        .find();
    }).then((cities: City[]) => {
      this.cities = cities;
      this.isFetching = false;
    });
  }

  selectCityById(id: string) {
    this.currentCity = null;
    this.currentCityPeople = [];

    this.isFetching = true;
    (new Parse.Query(City)).equalTo('objectId', id).find().then((cities: City[]) => {
      if (cities.length < 1)
        throw new Error('City not found');
      return this.currentCity = cities[0];
    }).then((currentCity: City) => {
      return (new Parse.Query(Person)).equalTo('city', currentCity).find();
    }).then((people: Person[]) => {
      this.currentCityPeople = people;
      this.isFetching = false;
    });
  }

}

export default CityStore;
