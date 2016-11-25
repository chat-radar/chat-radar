import { CityStore, ChatStore, PersonStore } from '../../stores';

interface ISidePanelContainerProps {
  stores: {
    personStore: PersonStore;
    cityStore: CityStore;
    chatStore: ChatStore;
  };
};

export default ISidePanelContainerProps;
