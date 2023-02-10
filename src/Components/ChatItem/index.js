import Handlebars from 'handlebars/dist/handlebars.runtime';
import Item from './item.hbs';

import './item.pcss';

Handlebars.registerPartial('ChatItem', Item);
