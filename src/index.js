import Routes from './routers';
import './Helpers'
import './Components'
import './style.pcss';

import ModalTmpl from './Components/Alerts/Modal/modal-tmpl.hbs';
import chatData from './Pages/Chat/chats.json';

document.addEventListener('DOMContentLoaded', () => {
    renderPage({data: chatData});
});

window.addEventListener("popstate", () => {
    renderPage({data: chatData});
});

window.goToPage = function (name) {
    const page = Routes[name];     
    window.history.pushState(null, '', name);
    
    render(page({data: chatData}));
}

window.onShowModal = function (param) {
    const modalsDom     = document.querySelector('#modals')
    modalsDom.innerHTML = ModalTmpl({window: param})
}

window.modalClose = function () {
    const modal = document.querySelector('.modal');
    modal.classList.remove('show');
    modal.classList.add('hide')
}

function renderPage(params = {}) {
    let currentPage = getCurrentPage();
    render(Routes[currentPage](params));
}

function render(html) { 
    const root = document.querySelector('#root');
    root.innerHTML = html;
}

function getCurrentPage()
{
    const pathName = window.location.pathname.replace('/', '');
    if(!location || !Routes[pathName]) {
        return 'login';
    }

    return pathName;
}