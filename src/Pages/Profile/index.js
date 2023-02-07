import Profile from './profile.hbs';
import './profile.pcss';

window.showEditBlocks = (str) => {
    const profile = document.querySelector('.show-profile');
    const profileActions = document.querySelector('.profile_right_info_actions');
    const changePassword = document.querySelector('.change-password');
    const saveButton = document.querySelector('.profile_right_info_data_save-button');
    const valueField = document.querySelectorAll('.profile_right_info_data_field-value');

    if(str == 'edit-data') { 
        profileActions.classList.add('display-none');
        saveButton.classList.remove('display-none');
        
        valueField.forEach(item => {
            const valueInput = item.querySelector('input')
            const valueText = item.querySelector('span');
            try {
                valueText.classList.add('display-none')
                valueInput.classList.add('display-block')
            }catch(err) {}
        })
    }

    if(str == 'edit-password') {
        profile.classList.add('display-none');
        changePassword.classList.remove('display-none');
        saveButton.classList.remove('display-none');
        profileActions.classList.add('display-none');

        valueField.forEach(item => {
            const valueInput = item.querySelector('input');
            valueInput.classList.add('display-block')
        })
    }

    if(str == 'show-profile') {
        profile.classList.remove('display-none');
        changePassword.classList.add('display-none');
        saveButton.classList.add('display-none');
        profileActions.classList.remove('display-none');

        valueField.forEach(item => {
            const valueInput = item.querySelector('input')
            const valueText = item.querySelector('span');
            try {
                valueText.classList.remove('display-none')
                valueInput.classList.remove('display-block')
            } catch(err) {}
        })
    }

}

export default Profile;