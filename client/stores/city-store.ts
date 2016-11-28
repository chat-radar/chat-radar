import { observable } from 'mobx';
import * as Parse from 'parse';
import { City, Person } from '../api';
import { find } from 'lodash';

class CityStore {

  @observable cities: City[] = [];

  @observable currentCity: City = null;

  @observable currentCityPeople: Person[] = [];

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

  selectCityById(id: string) {
    this.currentCity = null;
    this.currentCityPeople = [];

    const currentCity = find(this.cities, (city: City) => city.id === id);
    if (!currentCity) return;

    this.currentCity = currentCity;

    (new Parse.Query(Person))
      .equalTo('city', currentCity)
      .find()
      .then((people: Person[]) => {
        this.currentCityPeople = people;
      });
  }

}

export default CityStore;
