import * as Parse from 'parse';
import { City, Person } from '../../api';

interface IBackgroundMapMarkerProps {
  style: any;
  marker: {
    city: City;
    people: Person[];
    file: Parse.File;
    onClick: any;
  };
};

export default IBackgroundMapMarkerProps;
