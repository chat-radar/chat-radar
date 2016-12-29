import { CityStore, ChatStore, PersonStore } from '../../stores';

interface ICitiesListContainerProps {
  personStore: PersonStore;
  cityStore: CityStore;
  chatStore: ChatStore;
};

export default ICitiesListContainerProps;
