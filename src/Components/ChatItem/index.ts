import Block from '../../utils/Block';
import template from './item.hbs';
import './item.pcss';

type TChatProps = {
    [key:string]: any
};

export default class Chat extends Block {

    constructor(props: TChatProps) { 
        super(props)
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }

}
