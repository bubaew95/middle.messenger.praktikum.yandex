import { LOGIN_PAGE, REGISTRATION_PAGE, ROUTERS } from './utils/Routes';
import './Components';
import 'icon-blender/css/icon-blender.css';
import './style.pcss';

import './Helpers/Substr'
import Router from './utils/Router';
import { BlockConstructable } from './utils/Route';

window.addEventListener('DOMContentLoaded', async () => {
    
    const router = new Router('#root'); 
    Object.keys(ROUTERS).map(
        item => router.use(item, (ROUTERS[item] as keyof BlockConstructable))
    );

    

    router.start();

});
