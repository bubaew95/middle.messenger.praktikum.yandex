import API, { ChatsAPI } from '../Api/ChatsApi';
import store from '../utils/Store';
import ProfileAPI, { IUserData, ProfileAPI as BaseProfileApi } from '../Api/ProfileAPI';
import MessagesController from './MessagesController';

export interface IResult {
  status: string;
  msg: string;
}

export class ChatsController {
  ;

  constructor(
    private readonly api: ChatsAPI = API,
    private readonly profileAPI: BaseProfileApi = ProfileAPI
  ) {
    this.api = api;
    this.profileAPI = profileAPI;
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
    const users = await this.profileAPI.searchUsers(login);
    const user = users.filter((user: IUserData) => user.login === login);
    if(!user) {
      throw new Error('Пользователь с таким логимом не найден!');
    }

    return (user[0] as IUserData).id;
  }

  async addUserToChat(login: string, chatId: number): Promise<IResult> {
    try {  
      const userId = await this.getLoginId(login);
      await this.api.addUserToChat(userId, chatId);
      return {
        status: 'success',
        msg: 'Пользователь добавлен'
      };
    } catch (e: any) {
      return {
        status: 'error',
        msg: `Не найден пользователь с "${login}" таким логином!`
      }
    }
  }

  async deleteUserFromChat(login: string, chatId: number): Promise<IResult> {
    try {
      const userId = await this.getLoginId(login);
      await this.api.deleteUserFromChat(userId, chatId);
      return {
        status: 'success',
        msg: 'Пользователь добавлен'
      };
    } catch (e: any) {
      return {
        status: 'error',
        msg: `Не найден пользователь с "${login}" таким логином!`
      }
    }
  }

  async deleteChat(chatId: number): Promise<IResult> {
    try {
      await this.api.delete(chatId);
      this.fetchChats();
      return {
        status: 'success',
        msg: ''
      }
    } catch (e: any) {
      return {
        status: 'error',
        msg: e.reason
      }
    }
  }

  selectChat(id: number) {
    store.set('selectedChat', id);
  }

}

export default new ChatsController();
