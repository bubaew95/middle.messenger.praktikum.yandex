import { CHAT_PAGE, LOGIN_PAGE, PROFILE_CHANGE_PASSWORD_PAGE, PROFILE_EDIT_PAGE, PROFILE_PAGE, REGISTRATION_PAGE, renderDom } from './routers';
import './Components';
import 'icon-blender/css/icon-blender.css';
import './style.pcss';

import './Helpers/Substr'

window.addEventListener('DOMContentLoaded', () => {
    renderDom(PROFILE_EDIT_PAGE)
});
