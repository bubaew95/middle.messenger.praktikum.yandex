import Profile from './profile.hbs';

import ProfileTmpl from './profile-tmpl.hbs';
import EditProfile from './edit-profile.hbs';
import ChangePassword from './change-password.hbs';

import './profile.pcss';
import { TRoutes } from '../../routers';

type Nullable<T> = T | null;

window.showEditBlocks = (str: string): boolean => {
    const profile: Nullable<HTMLDivElement> = document.querySelector('.show-profile') as HTMLDivElement;
    const actions: Nullable<HTMLDivElement> = document.querySelector('.profile_right_info_actions') as HTMLDivElement;
    const profileContent: Nullable<HTMLDivElement> = document.querySelector('.profile_right_info_data_content') as HTMLDivElement;
    
    if(str == 'profile') {
        actions.classList.remove('display-none');
        actions.classList.add('display-block');
        profile.classList.remove('display-none');
        profileContent.innerHTML = '';
        return false;
    } else {
        profile.classList.add('display-none');
        actions.classList.add('display-none');
        actions.classList.remove('display-block');
    }

    
    let templateRoutes: TRoutes = {
        'profile': ProfileTmpl,
        'edit-profile': EditProfile,
        'change-password': ChangePassword
    }

    if(profileContent) {
        let template = templateRoutes[str] ;
        profileContent.innerHTML = template();  
        return true;
    }
    return false; 
}

export default Profile;
