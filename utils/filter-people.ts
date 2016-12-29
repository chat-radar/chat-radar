import { City, Person, Chat } from '../client/api';

export default function filterPeople(people: Person[], chat: Chat = null, city: City = null) {
  const inChat = (chat === null) ? [] : people.filter((person) => {
    if (person.get('chat').id === chat.id)
      return true;
    return false;
  });

  const inCity = (city === null) ? [] : inChat.filter((person) => {
    if (person.get('city').id === city.id)
      return true;
    return false;
  });

  const online = inCity.filter((person) => person.get('online'));

  return { inChat, inCity, online };
};
