import BaseAPI from './BaseAPI';



export interface ChatData {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    created_by?: number;
    last_message: {
        user: {
            first_name: string;
            second_name: string;
            avatar: string;
            email: string;
            login: string;
            phone: string
        },
        time: string;
        content: string;
    }
}

export interface DeleteChatData {
    "userId": number,
    "result": {
      "id": number,
      "title": string,
      "avatar": string
    }
}

export interface IToken {
    token: string
}

export class ChatsAPI extends BaseAPI 
{
    constructor() {
        super('/chats');
    }

    public create(data: {title: string}): Promise<{id: number}> {
        return this.http.post('/', data);
    }
    
    public read(): Promise<ChatData[]> {
        return this.http.get('/');
    }

    public async getToken(id: number): Promise<string> {
        const response = await this.http.post<{ token: string }>(`/token/${id}`);
        return response.token;
    }

    public addUserToChat(userId: number, chatId: number) {
        return this.http.put('/users', {
            users: [
                userId
            ], 
            chatId
        })
    }

    public deleteUserFromChat(userId: number, chatId: number) {
        return this.http.delete('/users', {
            users: [
                userId
            ], 
            chatId
        })
    }

    public delete(chatId: number) {
        return this.http.delete('/', {chatId})
    }

    update = undefined; 
}

export default new ChatsAPI();
