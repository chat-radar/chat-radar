import { City } from '../../api';
import * as Parse from 'parse';

interface IBackgroundMapProps {
  cities: City[];
  currentCity?: City;
  markerFile: Parse.File;
  onCityClick: Function;
};

export default IBackgroundMapProps;
