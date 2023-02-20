import Block from '../../utils/Block'; 
import template from './button.hbs';
import './button.pcss'

interface ButtonProps {
  title: string;
  className: string|null;
  events?: {
    click: (e: Event) => void;
  };
}

export default class Button extends Block {
    
    constructor(props: ButtonProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
  