import Block from "../../utils/Block";
import template from './link.hbs';

interface ILinkProps {
    containerClassName?:string;
    className?: string;
    text: string;
    template?: string;
    events?: {
        click: () => void;
    };
}

export default class Link extends Block {
    
    constructor(props: ILinkProps){
        super(props)
    }

    protected render(): DocumentFragment {
        return this.compile(
            this.props.template ?? template, 
            this.props
        );
    }

}
