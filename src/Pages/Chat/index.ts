import template from './chat.hbs'
import Block from '../../utils/Block';
import { ChatItem, Field, Link, Messages, Modal } from '../../Components';
import data from '../../Api/chats.json'; 

import './chat.pcss';
import { PROFILE_PAGE } from '../../utils/Routes';
import ChildType from '../../typings/ChildrenType';
import { withStore } from '../../utils/Store';
import Router from '../../utils/Router';
import ChatsController from '../../Controllers/ChatsController';
import ModalForm from '../../Components/Modal/Form';

class ChatPageBase extends Block {

    protected componentDidUpdate(oldProps: any, newProps: any): boolean { 
        if(!!newProps.chats) {
            let child: ChildType = this.children;
            child.Chat = new Messages({});

            let chats: Block[] = [];
            newProps.chats.map((item: {[key: string]: any}) => { 
                const chatItem = new ChatItem({                 
                    ...item,
                    events: {
                        click: async (e: PointerEvent) => {
                            const token = await ChatsController.token(item.id);
                            (child.Chat as Block).setProps({selectedChat: {
                                ...item,
                                ...token
                            }});
                        }
                    }
                });
    
                chats.push(chatItem);
            });

            child.Chats = chats;
            return true;
        }

        return false;
    }

    protected init(): void {
        ChatsController.all();
        
        let child: ChildType = this.children;
        child.Modal = new Modal({});

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

const withChats = withStore((store) => ({ 
    ...store
 }))

export default withChats(ChatPageBase as typeof Block);
