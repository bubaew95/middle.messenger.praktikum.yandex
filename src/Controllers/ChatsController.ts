import API, { ChatsAPI } from '../Api/ChatsApi';
import store from '../utils/Store';
import router from '../utils/Router';

export class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  async all() {
    try {
        const chats = await this.api.read();
        store.set('chats', chats)
    } catch (e: any) {
      store.set('chats.error', e.reason);
    }
  }

  async create(title: string) {
    try {
        await this.api.create({title});
        await this.all();
    } catch (e: any) {
      store.set('chats.error', e.reason);
    }
  }

}

export default new ChatsController();
