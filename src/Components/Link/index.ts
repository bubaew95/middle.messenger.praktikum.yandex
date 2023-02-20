import Block from "../../utils/Block";
import template from './link.hbs';

interface ILinkProps {
    className?: string;
    text: string;
    events?: {
        click: () => void;
    };
}

export default class Link extends Block {
    
    constructor(props: ILinkProps){
        super(props)
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }

}
