import Block from '../../utils/Block';
import template from './item.hbs';
import './item.pcss';


export default class Chat extends Block {

    constructor(props) { 
        super(props)
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }

}
