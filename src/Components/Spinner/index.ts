

import Block from '../../utils/Block';
import template from './spinner.hbs';
import './spinner.pcss';

interface ISpinner {
    state: boolean
}

export default class Spinner extends Block<ISpinner> 
{
    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
