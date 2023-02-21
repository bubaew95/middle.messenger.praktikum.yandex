import Block from '../../utils/Block';
import template from './messages.hbs';
import templateEmptyMessages from './empty-messages.hbs';
import './messages.pcss';
import MessageItem from './MessageItem';


export default class Messages extends Block {

    constructor(props) { 
        super(props);
    }

    protected componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(oldProps.id !== newProps.id) {
            console.log(newProps);
            
            let child: {[key: string]: Block | Block[]} = this.children;
            if(newProps.messages) {
                child.Messages = [];
                newProps.messages.map(item => {
                    child.Messages.push(new MessageItem(item))
                })
                return true;
            } 
            return false;
        } 
        return false;
    }

    protected render(): DocumentFragment {
        return this.compile(
            !this.props.message 
                ? templateEmptyMessages 
                : template, 

            this.props
        )
    }

}
