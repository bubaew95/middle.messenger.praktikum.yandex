import Block from '../../utils/Block';
import template from './input.hbs';
import './input.pcss';

interface IInputProps {
    name: string;
    className?: string;
    type?: string;
    placeholder?:string;
    value?: string;
    accept?: string;
    events?: {
        keyup?: (e: KeyboardEvent) => void;
        blur?: (e: FocusEvent) => void;
    };
}

export default class Input extends Block {
    constructor(props: IInputProps) {
        super(props)
    }

    getName(): string {
        return (this.element as HTMLInputElement).value;
    }

    getValue(): string {
        return (this.element as HTMLInputElement).value;
    }

    render(): DocumentFragment { 
        return this.compile(template, this.props)
    }

}
