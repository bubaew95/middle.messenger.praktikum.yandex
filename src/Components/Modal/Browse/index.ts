import ChildType from '../../../typings/ChildrenType';
import Block from '../../../utils/Block';
import Button from '../../Button';
import Field from '../../Field';
import Form from '../../Form';
import template from './browse.hbs'

interface IBrowseProps {
    name?: string,
    accept?: string;
    onSubmit: (formData: FormData) => void;
}

export default class Browse extends Block {

    constructor(props: IBrowseProps) {
        super(props);
    }

    protected init(): void {
        let child: ChildType = this.children;
        
        const FileField = new Field({
            name: this.props.name ?? 'avatar',
            label: 'Выбрать файл на компьютере', 
            type: 'file',
            parentClassName: 'modal_body_browse',
            className: 'display-none',
            accept: this.props.accept ?? 'image/*'
        });

        const SaveButton = new Button({
            title: 'Сохранить',
            className: 'button',
            type: 'submit'
        });

        child.Form = new Form({
            body: [
                FileField,
                SaveButton
            ],
            events: {
                submit:(e: SubmitEvent) => {
                    e.preventDefault();
                    const formData = (child.Form as Block).getContent();
                    this.props.onSubmit(
                        new FormData(formData as HTMLFormElement)
                    );
                }
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
