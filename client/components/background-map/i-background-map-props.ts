import { City, Person, Chat } from '../../api';

interface IBackgroundMapProps {
  cities: City[];
  people: Person[];
  currentCity?: City;
  currentChat: Chat;
  onCityClick: Function;
};

export default IBackgroundMapProps;
