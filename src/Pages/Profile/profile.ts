import Block from '../../utils/Block';
import template from './profile.hbs';
import './profile.pcss';
import { Link } from '../../Components';
import Icon from '../../Components/Icon';
import { CHAT_PAGE, PROFILE_CHANGE_PASSWORD_PAGE, PROFILE_EDIT_PAGE } from '../../utils/Routes';
import ProfileAvatar from '../../Components/ProfileAvatar';
import ProfileData from '../../Components/ProfileData';
import ChildType from '../../typings/ChildrenType';
import { withStore } from '../../utils/Store';
import Router from '../../utils/Router';
import { getAvatar } from '../../utils/Helpers';
import  AuthController from '../../Controllers/AuthController';

class ProfileBase extends Block {
    protected init(): void {
        let child: ChildType = this.children;

        child.PrevButton = new Icon({
            icon: 'la-long-arrow-alt-left',
            className: 'profile_left_prev-icon',
            events: {
                click: () => Router.go(CHAT_PAGE)
            }
        })

        const avatar = getAvatar(this.props.avatar);
        child.ChangeAvatar = new ProfileAvatar({
            image: avatar,
            isNotEdit: true,
        });

        child.ProfileData = new ProfileData(this.props);

        child.EditProfile = new Link({
            text: 'Изменить данные', 
            events: {
                click: () => Router.go(PROFILE_EDIT_PAGE)
            }
        });

        child.EditPassword = new Link({
            text: 'Изменить пароль', 
            events: {
                click: () => Router.go(PROFILE_CHANGE_PASSWORD_PAGE)
            }
        });

        child.Logout = new Link({
            text: 'Выйти',
            className: 'text-danger', 
            events: {
                click: () => AuthController.logout()
            }
        }); 
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

const withProfile = withStore((store) => ({ 
    ...store.user.data
 }))

export default withProfile(ProfileBase as typeof Block);
