import API, { ChatsAPI } from '../Api/ChatsApi';
import store from '../utils/Store';
import ProfileAPI, { IUserData } from '../Api/ProfileAPI';
import MessagesController from './MessagesController';

export class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  async fetchChats() {
    try {
      const chats = await this.api.read();
      
      chats.map(async (chat) => {
        const token = await this.getToken(chat.id);
        
        await MessagesController.connect(chat.id, token);
      });

      store.set('chats', chats);
    } catch (e: any) {
      store.set('chats.error', e.reason);
    }
  }

  async create(title: string) {
    try {
        await this.api.create({title});
        this.fetchChats();
    } catch (e: any) {
      store.set('chats.error', e.reason);
    }
  }

  getToken(id: number) {
    return this.api.getToken(id); 
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
      const addUserResponse = await this.api.addUserToChat(userId, chatId);
      return {
        status: 'success',
        msg: addUserResponse
      };
    } catch (e: any) {
      return {
        status: 'error',
        msg: e.reason
      }
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
      await this.api.delete(chatId);
      
      this.fetchChats();
    } catch (e: any) {
      store.set('chat.delete.error', e.reason);
    }
  }

  selectChat(id: number) {
    store.set('selectedChat', id);
  }

}

export default new ChatsController();
