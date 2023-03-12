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

        child.ChangeAvatar = new ProfileAvatar({
            image: 'https://i.ytimg.com/vi/S_bBS3tUwdU/maxresdefault.jpg',
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
                click: () => console.log('logout')
            }
        }); 
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

const withProfile = withStore((store) => ({ ...store.user }))

export default withProfile(ProfileBase as typeof Block);
