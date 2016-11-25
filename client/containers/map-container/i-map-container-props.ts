import { CityStore, ChatStore, PersonStore } from '../../stores';

interface IMapContainerProps {
  stores: {
    personStore: PersonStore;
    cityStore: CityStore;
    chatStore: ChatStore;
  };
};

export default IMapContainerProps;
