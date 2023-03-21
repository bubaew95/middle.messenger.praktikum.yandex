import template from './chat.hbs'
import Block from '../../utils/Block';
import { Field, Link, Messages, Modal } from '../../Components';
import './chat.pcss';
import { PROFILE_PAGE } from '../../utils/Routes';
import ChildType from '../../typings/ChildrenType';
import Router from '../../utils/Router';
import ChatsController from '../../Controllers/ChatsController';
import ModalForm from '../../Components/Modal/Form';
import Chats from '../../Components/Chat';

export default class ChatPage extends Block {
    protected init(): void {
        let child: ChildType = this.children;
        child.Modal = new Modal({});
        

        child.Messangers = new Messages({});
        child.Chats = new Chats({});

        ChatsController.fetchChats();

        child.AddChatLink = new Link({
            text: 'Создать чат <i class="ib eva-arrow-ios-forward-fill"></i>',
            className: 'chat_left-column_header-profile_link',
            events: {
                click: () => {
                    (child.Modal as Block).setProps({
                        title: 'Создать чат',
                        state: 'show',
                        body: new ModalForm({
                            fieldName: 'chat',
                            fieldText: 'Название чата',
                            buttonText: 'Создать',
                            onSubmit: (text: string) => {
                                (child.Modal as Block).setProps({
                                    state: 'hide'
                                });
                                ChatsController.create(text);
                            }
                        })
                    })
                }
            }
        });

        child.ProfileLink = new Link({
            text: 'Профиль <i class="ib eva-arrow-ios-forward-fill"></i>',
            className: 'chat_left-column_header-profile_link',
            events: {
                click: () => Router.go(PROFILE_PAGE)
            }
        });

        child.ChatSearch = new Field({ 
            name: 'search',
            className: 'chat_left-column_header-search_input',
            placeholder: 'Поиск',
            onKeyup: (e: KeyboardEvent) => {
                const query = (e.target as HTMLInputElement).value;

                if(query.length === 0) {
                    return;
                }

                console.log(query);
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}
