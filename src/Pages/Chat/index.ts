import template from './chat.hbs'
import Block from '../../utils/Block';
import './chat.pcss';
 
import data from './chats.json'; 
import { ChatItem, MessageItem, Messages } from '../../Components';


export default class ChatPage extends Block {
    
    constructor(props) {
        super(props)
    }

    protected componentDidUpdate(oldProps: any, newProps: any): boolean {
        console.log(oldProps, newProps)
        return true;
    }

    protected init(): void {
        let child: {[key: string]: Block | Block[]} = this.children;

        child.Chat = new Messages({});

        child.Chats = [];
        data.map((item: {[key: string]: any}) => { 
            const chatItem = new ChatItem({
                ...item,
                events: {
                    click: (e: PointerEvent) => {
                        (child.Chat as Block).setProps({
                            id: item.id
                        })
                    }
                }
            });

            (child.Chats as Array<Block>).push(chatItem);
        }) 
 
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }

}
