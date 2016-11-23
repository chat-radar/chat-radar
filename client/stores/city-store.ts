import { observable } from 'mobx';

class CityStore {

  @observable cities = [];

  constructor() {
    this.cities.push({
      name: 'Благовещенск',
      geo: [50.257778, 127.536389],
    });
  }

  map(predicate) {
    return this.cities.map(predicate);
  }

}

export default CityStore;
