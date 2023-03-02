import template from './chat.hbs'
import Block from '../../utils/Block';
import { ChatItem, Field, Link, Messages } from '../../Components';
import data from '../../Api/chats.json'; 

import './chat.pcss';
import { PROFILE_PAGE, renderDom } from '../../routers';
import ChildType from '../../typings/ChildrenType';

export default class ChatPage extends Block {
    
    constructor(props: {}) {
        super(props)
    } 

    protected init(): void {
        let child: ChildType = this.children;

        child.Chat = new Messages({});

        let chats: Block[] = [];
        data.map((item: {[key: string]: any}) => { 
            const chatItem = new ChatItem({                 
                ...item,
                events: {
                    click: (e: PointerEvent) => {
                        (child.Chat as Block).setProps({
                            id: item.id
                        });
                    }
                }
            });

            chats.push(chatItem);
        });

        child.ProfileLink = new Link({
            text: 'Профиль <i class="ib eva-arrow-ios-forward-fill"></i>',
            className: 'chat_left-column_header-profile_link',
            events: {
                click: () => renderDom(PROFILE_PAGE)
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

        child.Chats = chats;
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }

}
