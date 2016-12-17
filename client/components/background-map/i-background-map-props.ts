import { City, Person } from '../../api';
import * as Parse from 'parse';

interface IBackgroundMapProps {
  cities: City[];
  people: Person[];
  currentCity?: City;
  markerFile: Parse.File;
  onCityClick: Function;
};

export default IBackgroundMapProps;
