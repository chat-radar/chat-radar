import { CityStore, ChatStore, PersonStore } from '../../stores';

interface ICityInfoContainerProps {
  personStore: PersonStore;
  cityStore: CityStore;
  chatStore: ChatStore;
};

export default ICityInfoContainerProps;
