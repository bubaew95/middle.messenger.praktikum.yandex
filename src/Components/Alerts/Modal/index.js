import template from './modal.hbs';
import browse from './browse.hbs';
import Handlebars from 'handlebars/dist/handlebars.runtime';

Handlebars.registerPartial('Modal', template);
Handlebars.registerPartial('ModalBrowse', browse);