import ChildType from "../../../typings/ChildrenType";
import Block from "../../../utils/Block";
import Button from "../../Button";
import Field from "../../Field";
import Form from "../../Form";
import template from './form.hbs';

interface IModelFormProps {
    onSubmit: (login: string) => void;
}

export default class ModalForm extends Block {

    constructor(props: IModelFormProps) {
        super(props)
    }

    protected init(): void {
        let child: ChildType = this.children;
        
        const LoginField = new Field({
            name: 'login',
            placeholder: 'Логин'
        });

        const FormButton = new Button({
            title: 'Сохранить',
            className: 'button'
        });

        child.Form = new Form({
            body: [ LoginField, FormButton ],
            events: {
                submit:(e: SubmitEvent) => {
                    e.preventDefault();
                    this.props.onSubmit(LoginField.getValue());
                }
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }
}
