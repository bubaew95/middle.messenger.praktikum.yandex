import Block from "../../utils/Block";
import template from './list.hbs';

interface IListProps {
    className?: string;
    icon?:string;
    iconClassName?: string;
    text?: string;
    events?: {
        click: () => void;
    };
}

export default class List extends Block {
    
    constructor(props: IListProps){
        super(props)
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
