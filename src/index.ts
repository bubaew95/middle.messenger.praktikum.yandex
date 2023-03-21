import { CHAT_PAGE, LOGIN_PAGE, REGISTRATION_PAGE, ROUTERS } from './utils/Routes';
import './Components';
import 'icon-blender/css/icon-blender.css';
import './style.pcss';

import './Helpers/Substr'
import './Helpers/Time'
import Router from './utils/Router';
import { BlockConstructable } from './utils/Route';
import AuthController from './Controllers/AuthController';

window.addEventListener('DOMContentLoaded', async () => {

    Object.keys(ROUTERS).map(
        item => Router.use(item, (ROUTERS[item] as keyof BlockConstructable))
    );

    
  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case LOGIN_PAGE:
    case REGISTRATION_PAGE:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();

    Router.start();

    if (!isProtectedRoute) {
      Router.go(CHAT_PAGE)
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(LOGIN_PAGE);
    }
  }

});
