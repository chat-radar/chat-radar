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

    const currentCity = this.cities.find((city: City) => city.id === id);
    if (!currentCity) return;

    this.currentCity = currentCity;

    this.isFetching = true;
    (new Parse.Query(Person))
      .equalTo('city', currentCity)
      .find()
      .then((people: Person[]) => {
        this.currentCityPeople = people;
        this.isFetching = false;
      });
  }

}

export default CityStore;
