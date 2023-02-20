import template from './chat.hbs'
import Block from '../../utils/Block';
import './chat.pcss';
 
import data from './chats.json'; 
import { ChatItem, MessageItem } from '../../Components';


export default class Chat extends Block {
    
    constructor(props) {
        super(props)
    }

    protected componentDidUpdate(oldProps: any, newProps: any): boolean {
        console.log(oldProps, newProps)
        return true;
    }

    protected init(): void {
        let child: {[key: string]: Block | Block[]} = this.children;

        child.Chats = [];

        data.map((item: {[key: string]: any}) => { 
            const chatItem = new ChatItem({
                ...item,
                events: {
                    click: (e: PointerEvent) => {
                        this.setProps({
                            Messages: new MessageItem(item)
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
