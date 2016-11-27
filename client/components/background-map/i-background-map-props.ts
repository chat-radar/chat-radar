import { City } from '../../api';
import * as Parse from 'parse';

interface IBackgroundMapProps {
  cities: City[];
  markerFile: Parse.File;
  onCityClick: Function;
};

export default IBackgroundMapProps;
