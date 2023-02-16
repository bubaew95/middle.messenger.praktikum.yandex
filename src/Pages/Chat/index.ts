import Chat from './chat.hbs'
import './chat.pcss';

import SelectChat from './Partials/select-chat.hbs';

import Data from './chats.json';

type Nullable<T> = T | null;
let openFlag: {[key: string]: boolean} = {};

window.selectChat = (id: string): void => {
    const filter = Data.filter((item: typeof Data) => item.id === id);
    
    let chatBlock: Nullable<HTMLDivElement> = document.querySelector('.chat-block') as HTMLDivElement;

    chatBlock.innerHTML = SelectChat(filter[0]);
}

window.openBox = (context: Event, boxId:string | null = null): void  => {
    
    if(!boxId) {
        return;
    }

    const dom:Nullable<HTMLDivElement> = document.querySelector(`#${boxId}`) as HTMLDivElement;

    if(openFlag[boxId]) { 
        dom.classList.remove('display-block');
        openFlag[boxId] = false;
    } else {
        dom.classList.add('display-block');
        openFlag[boxId] =  true;
    }
}

window.onDelete = (e: Event): void => {
    e.preventDefault();
    console.log('onDelete')
}

window.onAdd =  (e: Event): void => {
    e.preventDefault();
    console.log('onAdd')
}

export default Chat;
