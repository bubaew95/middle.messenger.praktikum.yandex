import Chat from './chat.hbs'
import './chat.pcss';

import SelectChat from './Partials/select-chat.hbs';

import Data from './chats.json';

window.selectChat = function (id) {
    const filter = Data.filter(item => item.id === id);
    let chatBlock = document.querySelector('.chat-block');

    chatBlock.innerHTML = SelectChat(filter[0]);
}

let openFlag = {};
window.openBox = function (context, boxId = null) {
    console.log(boxId)
    if(!boxId) {
        return false;
    }
    const dom = document.querySelector(`#${boxId}`)

    if(openFlag[boxId]) { 
        dom.classList.remove('display-block');
        openFlag[boxId] = false;
    } else {
        dom.classList.add('display-block');
        openFlag[boxId] =  true;
    }
}

window.onDelete = function (e) {
    e.preventDefault();
    console.log('onDelete')
}

window.onAdd = function (e) {
    e.preventDefault();
    console.log('onAdd')
}

// document.addEventListener('DOMContentLoaded', () => { 
//     let _interval = setInterval(() => {
//         try {
//             let chatBlock = document.querySelector('.chat-block');
//             chatBlock.innerHTML = SelectChat(Data[0]);

//             clearInterval(_interval)
//         } catch(err) {} 
//     }, 500)
// })

export default Chat;
