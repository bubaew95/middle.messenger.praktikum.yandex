import { Nullable } from '../../typings/Nullable';
import Block from '../../utils/Block';
import Input from '../Input';
import template from './field.hbs';

import './field.pcss';

interface FieldProps {
    name: string;
    label: string | null;
    error?: string | null;
    type?: string;
    onBlur?: (e: FocusEvent) => void;
    events?: {
      click: (e: Event) => void;
    };
}

export default class Field extends Block {

    constructor(props: FieldProps) {
        super(props)
    }

    getValue(): string {
        const input: Nullable<HTMLInputElement> = (this.children.Input as Input).element as HTMLInputElement
        return input.value;
    }

    init() {
        this.children.Input = new Input({
            ...this.props,
            events: {
                blur: (e: FocusEvent) => this.props?.onBlur(e)
            }
        }) 
    }

    render(): DocumentFragment { 
        return this.compile(template, this.props)
    }

}
