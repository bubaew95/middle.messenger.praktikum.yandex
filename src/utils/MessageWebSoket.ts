import { EventBus } from "./EventBus";


export default class MessageWebSoket extends WebSocket {
    private eventBus: () => EventBus;

    constructor(userId: number, chatId: number, token: string)
    {
      super(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
      const eventBus = new EventBus();
      this.eventBus = () => eventBus;
      this.onopen();
    }

    onopen = () => {
      console.log('Websocket opent')
    }

    onclose = () => {
      console.log('Websocket close')
    }
}

/**
 const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/623031/${newProps.id}/a74d8503a120f1a97368ffaacfc650bd6727e1f2:1678635776`);

    socket.addEventListener('open', () => {
      console.log('Соединение установлено');
    
      socket.send(JSON.stringify({
        content: 'Моё первое сообщение миру!',
        type: 'message',
      }));
    });
    
    socket.addEventListener('close', event => {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения');
    }

    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });
    
    socket.addEventListener('message', event => {
    console.log('Получены данные', event.data);
    });
    
    socket.addEventListener('error', event => {
    console.log('Ошибка', event?.message);
    });
*/
