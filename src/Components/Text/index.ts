import Block from "../../utils/Block";
import template from './text.hbs';

interface ITextProps {
    className?: string;
    text: string;
}

export default class Icon extends Block {
    
    constructor(props: ITextProps){
        super(props)
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
