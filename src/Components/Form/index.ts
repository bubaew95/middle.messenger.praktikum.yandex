import Block from "../../utils/Block";
import template from './form.hbs';

interface IFormEvents {
    submit: (e: SubmitEvent) => void;
}

interface IFormProps { 
    [key: string]: Block | Block[] | IFormEvents;
    events: IFormEvents;
}

export default class Form extends Block
{
    constructor(props: IFormProps) {
        super(props)
    }

    protected render(): DocumentFragment {
        return this.compile(
            this.props.template ?? template, 
            this.props
        )
    } 
}
