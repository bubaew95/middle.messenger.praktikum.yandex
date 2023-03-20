import { Nullable } from '../../typings/Nullable';
import Block from '../../utils/Block';
import Input from '../Input';
import template from './field.hbs';

import './field.pcss';

interface FieldProps {
    name: string;
    label?: string;
    error?: string;
    className?: string;
    parentClassName?:string;
    type?: string;
    placeholder?:string;
    value?: string;
    accept?:string;
    onBlur?: (e: FocusEvent) => void;
    onKeyup?: (e: KeyboardEvent) => void;
    events?: {
        blur?: (e: FocusEvent) => void;
        keyup?: (e: KeyboardEvent) => void;
    }
}

export default class Field extends Block {

    constructor(props: FieldProps){
        super(props);
    }

    getName(): string {
        const input: Nullable<HTMLInputElement> = (this.children.Input as Input).element as HTMLInputElement
        return input.name;
    }

    public setValue(value: string) {
        const input: Nullable<HTMLInputElement> = (this.children.Input as Input).element as HTMLInputElement
        return input.value = value;
    }

    getValue(): string {
        const input: Nullable<HTMLInputElement> = (this.children.Input as Input).element as HTMLInputElement
        return input.value;
    }

    init() {
        let props = this.props;

        if(this.props.onBlur) { 
            props = {
                ...props,
                events: {
                    blur: (e: FocusEvent) => this.props.onBlur!(e)
                }
            } 
        }

        if(this.props.onKeyup) {
            props = {
                ...props,
                events: {
                    keyup: (e: KeyboardEvent) => this.props.onKeyup!(e)
                }
            } 
        }

        this.children.Input = new Input(props) 
    }

    render(): DocumentFragment { 
        return this.compile(template, this.props)
    }

}
