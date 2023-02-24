import Block from "../../utils/Block";
import template from './action.hbs';

interface IActionProps {
    state?:string;
    className?: string;
    List?: Block[];
    events?: {
        click: () => void;
    };
}

export default class Action extends Block {
    
    constructor(props: IActionProps){ 
        super(props)
    }
    
    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
