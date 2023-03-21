import LoginPage from '../Pages/Login';
import RegistrationPage from '../Pages/Registration'; 
import {Profile, EditProfile} from '../Pages/Profile';
import ChatPage from '../Pages/Chat';
import { ChangePassword } from '../Pages/Profile';
import ErrorPage from '../Pages/Error';

export type TRoutes = {
    [key: string]: Function
};

export const LOGIN_PAGE = '/';
export const REGISTRATION_PAGE = '/sign-up';
export const CHAT_PAGE = '/messenger';
export const PROFILE_PAGE = '/settings';
export const PROFILE_EDIT_PAGE = '/settings/edit';
export const PROFILE_CHANGE_PASSWORD_PAGE = '/settings/change-password';
export const ERROR_PAGE = '/error'; 

export const ROUTERS: TRoutes = {
    [LOGIN_PAGE]: LoginPage,
    [REGISTRATION_PAGE]: RegistrationPage,
    [CHAT_PAGE]: ChatPage,  
    [PROFILE_PAGE]: Profile,
    [PROFILE_EDIT_PAGE]: EditProfile,
    [PROFILE_CHANGE_PASSWORD_PAGE]: ChangePassword,
    [ERROR_PAGE]: ErrorPage, 
};
