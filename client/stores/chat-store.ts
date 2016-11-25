import { observable, computed } from 'mobx';
import * as Parse from 'parse';
import { Chat } from '../api';

class ChatStore {

  @observable chats: Chat[] = [];

  @computed get currentChat(): Chat {
    if (this.chats.length === 0)
      return null;
    return this.chats[0];
  }

  constructor() {
    (new Parse.Query(Chat)).find().then((chats: Chat[]) => {
      this.chats = chats;
    });
  }

}

export default ChatStore;
