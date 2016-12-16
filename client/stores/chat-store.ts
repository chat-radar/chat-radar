import { observable, computed } from 'mobx';
import * as Parse from 'parse';
import { Chat } from '../api';

class ChatStore {

  @observable chats: Chat[] = [];

  @computed get currentChat(): Chat {
    if (this.chats.length < 1)
      return null;
    return this.chats[0];
  }

  @observable isFetching: boolean = false;

  async fetchChats() {
    if (this.isFetching || this.chats.length > 0)
      return;

    this.isFetching = true;

    try {
      this.chats = await (new Parse.Query(Chat)).find();
    } catch (err) {
      console.error(err);
    }

    this.isFetching = false;
  }

}

export default ChatStore;
