import { City, Person } from '../client/api';

export default function filterPeople(people: Person[], city: City) {
  const inCity = people.filter((person) => {
    if (person.get('city').id === city.id)
      return true;
    return false;
  });

  const online = inCity.filter((person) => person.get('online'));

  return { inCity, online };
};
