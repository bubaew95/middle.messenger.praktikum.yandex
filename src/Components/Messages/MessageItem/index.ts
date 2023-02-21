import Block from '../../../utils/Block';
import template from './message-item.hbs';
import './message-item.pcss';


export default class MessageItem extends Block {

    constructor(props) {   
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }

}
