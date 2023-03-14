import API, { ChatsAPI } from '../Api/ChatsApi';
import store from '../utils/Store';
import router from '../utils/Router';
import ProfileAPI, { IUserData } from '../Api/ProfileAPI';

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

  async token(id: number) {
    try {
      return await this.api.getToken(id); 
    } catch (e: any) {
      store.set('socket.error', e.reason);
    }
  }

  async getLoginId(login: string)
  {
    const users = await ProfileAPI.searchUsers(login);
    const user = users.filter((user: IUserData) => user.login === login);
    if(!user) {
      throw new Error('Пользователь с таким логимом не найден!');
    }

    return (user[0] as IUserData).id;
  }

  async addUserToChat(login: string, chatId: number) {
    try {
      const userId = await this.getLoginId(login);
      return await this.api.addUserToChat(userId, chatId);
    } catch (e: any) {
      store.set('chat.searchuser.error', e.reason);
    }
  }

  async deleteUserFromChat(login: string, chatId: number) {
    try {
      const userId = await this.getLoginId(login);
      return await this.api.deleteUserFromChat(userId, chatId);
    } catch (e: any) {
      store.set('chat.searchuser.error', e.reason);
    }
  }

  async deleteChat(chatId: number) {
    try {
      return await this.api.delete(chatId);
    } catch (e: any) {
      store.set('chat.delete.error', e.reason);
    }
  }

}

export default new ChatsController();
