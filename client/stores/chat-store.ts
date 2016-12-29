import { observable, computed } from 'mobx';
import * as Parse from 'parse';
import { Chat } from '../api';

class ChatStore {

  @observable chats: Chat[] = [];

  @observable protected currentChatId: string = null;

  @computed get currentChat(): Chat {
    return null;
    // if (this.chats.length < 1)
    //   return null;
    // return this.chats[0];
  }

  @observable isFetching: boolean = false;

  constructor() {
    this.fetchChats();
  }

  protected async fetchChats() {
    console.log('Fetching chats...');

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
