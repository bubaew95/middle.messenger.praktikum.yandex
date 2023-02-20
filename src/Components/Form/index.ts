import Block from "../../utils/Block";

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
        return this.compile(this.props.template, this.props)
    } 
}
