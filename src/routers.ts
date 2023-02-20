import LoginPage from './Pages/Login';
import RegistrationPage from './Pages/Registration';
import Chat from './Pages/Chat';
import Profile from './Pages/Profile';
import {Error404, Error500} from './Pages/Error';
import { Nullable } from './typings/Nullable';
import Block from './utils/Block';

export type TRoutes = {
    [key: string]: Function
};

export const LOGIN_PAGE = 'login';
export const REGISTRATION_PAGE = 'registration';
export const CHAT_PAGE = 'chat';
export const PROFILE_PAGE = 'profile';
export const ERROR_404_PAGE = 'error-404';
export const ERROR_500_PAGE = 'error-500';

const routers: TRoutes = {
    [LOGIN_PAGE]: LoginPage,
    [REGISTRATION_PAGE]: RegistrationPage,
    [CHAT_PAGE]: Chat,  
    [PROFILE_PAGE]: Profile,
    [ERROR_404_PAGE]: Error404,
    [ERROR_500_PAGE]: Error500
};

export const renderDom = (route: keyof typeof routers) => { 
    const PageComponent: Function = routers[route] ;
    const page:Block = new PageComponent({}) as Block; 
    
    const root: Nullable<HTMLDivElement> = document.querySelector('#root') as HTMLDivElement;
    root.innerHTML = ''; 

    root.append(page.getContent()!);
    page.dispatchComponentDidMount();
} 
