import * as Parse from 'parse';
import { City } from '../../api';

interface IBackgroundMapMarkerProps {
  style: any;
  marker: {
    city: City;
    file: Parse.File;
    onClick: any;
  };
};

export default IBackgroundMapMarkerProps;
