import BaseAPI from './BaseAPI';



export interface ChatData {
    "id": number,
    "title": string,
    "avatar": string,
    "unread_count": number,
    "last_message": {
        "user": {
            "first_name": string,
            "second_name": string,
            "avatar": string,
            "email": string,
            "login": string,
            "phone": string
        },
        "time": string,
        "content": string
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

    public update?(identifier: string, data: unknown): Promise<unknown> {
        throw new Error('Method not implemented.');
    }

    public delete(chatId: number): Promise<DeleteChatData> {
        throw new Error('Method not implemented.');
    }

}

export default new ChatsAPI();
