import { CHAT_PAGE, LOGIN_PAGE, REGISTRATION_PAGE, renderDom } from './routers';
import './Helpers'
import './Components'
import './style.pcss';

import ModalTmpl from './Components/Alerts/Modal/modal-tmpl.hbs';
import chatData from './Pages/Chat/chats.json';

window.addEventListener('DOMContentLoaded', () => {
    renderDom(CHAT_PAGE)
});
