import ChildType from '../../../typings/ChildrenType';
import Block from '../../../utils/Block';
import Button from '../../Button';
import Form from '../../Form';
import Link from '../../Link';
import template from './browse.hbs'

interface IBrowseProps {
    onSubmit: (e: SubmitEvent) => void;
}

export default class Browse extends Block {

    constructor(props: IBrowseProps) {
        super(props);
    }

    protected init(): void {
        let child: ChildType = this.children;
        
        child.Form = new Form({
            body: [
                new Link({
                    text: 'Выбрать файл на компьютере', 
                    containerClassName: 'modal_body_browse',
                    events: {
                        click: () => console.log('click browse image')
                    }
                }),
                new Button({
                    title: 'Сохранить',
                    className: 'button'
                })
            ],
            events: {
                submit:(e: SubmitEvent) => {
                    e.preventDefault();
                    this.props.onSubmit(e);
                }
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
