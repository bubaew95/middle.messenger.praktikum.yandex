import ChildType from '../../typings/ChildrenType';
import Block from '../../utils/Block';
import Action from '../Action';
import template from './modal.hbs';


export default class Modal extends Block {

    constructor(props: {}) { 
        super(props);
    }

    protected componentDidUpdate(_oldProps: any, newProps: any): boolean {
        if(newProps.body && newProps.body instanceof Block) { 
            this.children.body = newProps.body;
        }
        
        return true;
    }
 
    protected init(): void { 
        let child: ChildType = this.children;
        child.ModalBackground = new Action({
            className: 'modal_background',
            events: {
                click: () => this.setProps({
                    state: 'hide'
                })
            }
        }) 
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }

}
