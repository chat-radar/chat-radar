import { CityStore, ChatStore, PersonStore } from '../../stores';

interface IRootProps {
  personStore: PersonStore;
  cityStore: CityStore;
  chatStore: ChatStore;
};

export default IRootProps;
