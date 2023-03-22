import ChildType from "../../../typings/ChildrenType";
import Block from "../../../utils/Block";
import Button from "../../Button";
import Field from "../../Field";
import Form from "../../Form";
import template from './form.hbs';

interface IModelFormProps {
    fieldName?:string;
    fieldText?:string;
    buttonText?:string;
    onSubmit: (text: string) => void;
}

export default class ModalForm extends Block {

    constructor(props: IModelFormProps) {
        super(props)
    }

    protected init(): void {
        let child: ChildType = this.children;
        
        const FormField = new Field({
            name: this.props.fieldName ?? 'login',
            placeholder: this.props.fieldText ?? 'Логин'
        });

        const FormButton = new Button({
            title: this.props.buttonText ?? 'Сохранить',
            className: 'button',
            type: 'submit'
        });

        child.Form = new Form({
            body: [ FormField, FormButton ],
            events: {
                submit:(e: SubmitEvent) => {
                    e.preventDefault(); 
                    this.props.onSubmit(FormField.getValue());
                }
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}
