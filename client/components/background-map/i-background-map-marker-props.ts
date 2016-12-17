import * as Parse from 'parse';
import { City, Person } from '../../api';

interface IBackgroundMapMarkerProps {
  city: City;
  people: Person[];
  file: Parse.File;
  onClick: any;
};

export default IBackgroundMapMarkerProps;
