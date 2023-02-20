import Block from '../../utils/Block';
import template from './input.hbs';
import './input.pcss';

export default class Input extends Block {

    //TODO: Доработать типов
    constructor(props: {}) { 
        super(props)
    }

    getValue(): string {
        return (this.element as HTMLInputElement).value;
    }

    render(): DocumentFragment { 
        return this.compile(template, this.props)
    }

}
