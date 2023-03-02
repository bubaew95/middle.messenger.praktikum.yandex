import Block from "../../utils/Block";
import template from './icon.hbs';

interface IIconProps {
    className?: string;
    icon: string;
    iconClassName?:string;
    events?: {
        click: () => void;
    };
}

export default class Icon extends Block {
    
    constructor(props: IIconProps){
        super(props)
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
