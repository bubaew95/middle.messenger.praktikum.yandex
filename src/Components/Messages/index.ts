import Block from '../../utils/Block';
import template from './messages.hbs';
import templateEmptyMessages from './empty-messages.hbs';
import './messages.pcss';
import MessageItem from './MessageItem';

import data from '../../Pages/Chat/chats.json'; 

export default class Messages extends Block {

    constructor(props) { 
        super(props);
    }

    protected componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(oldProps.id !== newProps.id) {
            return this.addMessagesChildren(newProps);
        }

        return false;
    }

    private addMessagesChildren(newProps: {id: string}) {
        let child: {[key: string]: Block | Block[]} = this.children;

        const chats: Array<{[key:string]: any}> = data.filter(
            (item: {[key:string]: any}) => item.id == newProps.id
        );

        if(chats.length === 0) {
            return false;
        }
        
        const chat = chats[0];
        
        this.setProps({
            avatar: chat.avatar,
            name: chat.name
        })

        const messages = chat.messages;
        if(messages.length !== 0) { 
            child.Messages = [];
            messages.map((item: {[key: string]: any}) => {
                (child.Messages as Array<Block>).push(new MessageItem(item))
            })
            return true;
        }

        return false;
    }

    protected render(): DocumentFragment {
        return this.compile(
            !this.props.name 
                ? templateEmptyMessages 
                : template, 

            this.props
        )
    }

}
