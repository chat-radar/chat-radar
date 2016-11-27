import { CityStore, ChatStore, PersonStore } from '../../stores';

interface IStoresContext {
  personStore: PersonStore;
  cityStore: CityStore;
  chatStore: ChatStore;
};

export default IStoresContext;
