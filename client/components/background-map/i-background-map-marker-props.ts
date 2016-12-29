import * as Parse from 'parse';
import { City, Person } from '../../api';

interface IBackgroundMapMarkerProps {
  city: City;
  people: {
    inCity: Person[];
    online: Person[];
  };
  file?: Parse.File;
  onClick: Function;
};

export default IBackgroundMapMarkerProps;
