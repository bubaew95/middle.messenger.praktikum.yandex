import Routes, { TRoutes } from './routers';
import './Helpers'
import './Components'
import './style.pcss';

import ModalTmpl from './Components/Alerts/Modal/modal-tmpl.hbs';
import chatData from './Pages/Chat/chats.json';

type Nullable<T> = T | null;

document.addEventListener('DOMContentLoaded', (): void => {
    renderPage({data: chatData});
});

window.addEventListener("popstate", (): void => {
    renderPage({data: chatData});
});

window.goToPage = (name: string): void => {
    const page = Routes[name];     
    window.history.pushState(null, '', name);
    
    render(page({data: chatData}));
}

window.onShowModal = (param: string) : void => {
    const modalsDom :Nullable<HTMLDivElement> = document.querySelector('#modals') as HTMLDivElement;
    
    if(!modalsDom) {
        throw new Error("Модального окна на странице нет");
    }

    modalsDom.innerHTML = ModalTmpl({window: param})
}

window.modalClose = (): void => {
    const modal:Nullable<HTMLDivElement> = document.querySelector('.modal') as HTMLDivElement;

    if(!modal) {
        throw new Error("Нет открытого модального окна");
    }

    modal.classList.remove('show');
    modal.classList.add('hide')
}

const renderPage = (params = {}): void =>  {
    let currentPage = getCurrentPage();

    render(Routes[currentPage](params));
}

const render = (html: string): void => { 
    const root: Nullable<HTMLDivElement> = document.querySelector('#root') as HTMLDivElement;
    
    if(!root) {
        throw new Error("Отсуствует root id");
    }

    root.innerHTML = html;
}

const getCurrentPage = () => {
    const pathName = window.location.pathname.replace('/', '');

    if(!location || !Routes[pathName]) {
        return 'login';
    }

    return pathName;
}
