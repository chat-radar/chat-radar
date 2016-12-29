import { observable, computed } from 'mobx';
import * as Parse from 'parse';
import { Chat } from '../api';

class ChatStore {

  @observable chats: Chat[] = [];

  @observable protected currentChatId: string = null;

  @computed get currentChat(): Chat {
    if (!this.currentChatId || this.chats.length < 1)
      return null;
    return this.chats.find((chat: Chat) => chat.id === this.currentChatId) || null;
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

  async selectChatById(id: string) {
    this.currentChatId = id;
  }

}

export default ChatStore;
