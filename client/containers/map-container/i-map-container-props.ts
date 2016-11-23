import { PersonStore, CityStore } from '../../stores';

interface IMapContainerProps {
  stores: {
    personStore: PersonStore;
    cityStore: CityStore;
  };
};

export default IMapContainerProps;
