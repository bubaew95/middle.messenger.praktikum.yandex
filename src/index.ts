import { LOGIN_PAGE, renderDom } from './routers';
import './Components';
import 'icon-blender/css/icon-blender.css';
import './style.pcss';

import './Helpers/Substr'

window.addEventListener('DOMContentLoaded', () => {
    renderDom(LOGIN_PAGE)
});
