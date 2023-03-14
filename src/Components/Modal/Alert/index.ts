import ChildType from '../../../typings/ChildrenType';
import Block from '../../../utils/Block';
import Text from '../../Text';
import template from './alert.hbs'

interface IBrowseProps {
    text: string;
    status: string;
}

export default class Alert extends Block<IBrowseProps> {

    protected init(): void {
        let child: ChildType = this.children;
        
        child.Alert = new Text({
            text: this.props.text,
            className: this.props.status ?? 'info'
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
