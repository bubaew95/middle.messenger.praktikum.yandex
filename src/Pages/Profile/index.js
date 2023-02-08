import Profile from './profile.hbs';

import ProfileTmpl from './profile-tmpl.hbs';
import EditProfile from './edit-profile.hbs';
import ChangePassword from './change-password.hbs';

import './profile.pcss';

window.showEditBlocks = (str) => {
    const profile = document.querySelector('.show-profile');
    const actions = document.querySelector('.profile_right_info_actions');
    const profileContent = document.querySelector('.profile_right_info_data_content');
    
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

    let templateRoutes = {
        'profile': ProfileTmpl,
        'edit-profile': EditProfile,
        'change-password': ChangePassword
    }
    if(profileContent) {
        let template = templateRoutes[str];
        profileContent.innerHTML = template();  
        return true;
    }
    return false; 
}

export default Profile;
