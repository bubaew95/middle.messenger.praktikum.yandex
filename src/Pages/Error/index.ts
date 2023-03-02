import { Link } from "../../Components";
import { CHAT_PAGE, renderDom } from "../../routers";
import ChildType from "../../typings/ChildrenType";
import Block from "../../utils/Block";
import template from './error.hbs';
import './error.pcss';

export default class ErrorPage extends Block 
{
    constructor(props: {}) {
        props = {
            errorCode: '500',
            errorTitle: 'Что-то пошло не так',
        };
        super(props);
    }

    protected init(): void {
        let child: ChildType = this.children;
        child.Link = new Link({
            text: 'Назад к чатам',
            containerClassName: 'error-page_go-to-back mt-4',
            events: {
                click: () => renderDom(CHAT_PAGE)
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
