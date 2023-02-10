import Login from './Pages/Login/index.js';
import Registration from './Pages/Registration';
import Chat from './Pages/Chat';
import Profile from './Pages/Profile';
import {Error404, Error500} from './Pages/Error';

const routers = {
    'login': Login,
    'registration': Registration,
    'chat': Chat,  
    'profile': Profile,
    'error-404': Error404,
    'error-500': Error500
};

export default routers;
