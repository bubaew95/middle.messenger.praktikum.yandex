import Block from '../../utils/Block';
import template from './profile.hbs';
import './profile.pcss';
import { Link } from '../../Components';
import Icon from '../../Components/Icon';
import { CHAT_PAGE, PROFILE_CHANGE_PASSWORD_PAGE, PROFILE_EDIT_PAGE, renderDom } from '../../utils/Routes';
import ProfileAvatar from '../../Components/ProfileAvatar';
import ProfileData from '../../Components/ProfileData';
import ChildType from '../../typings/ChildrenType';

export default class Profile extends Block {
    constructor(props: {}) {
        props = {
            email: 'noxchi_dev@ya.ru',
            login: 'noxchi_dev',
            name: 'Noxcho',
            first_name: 'al-Shishany',
            nickname: 'noxchi developer',
            phone: '79999999999',
        };
        super(props)
    }

    protected init(): void {
        let child: ChildType = this.children;

        child.PrevButton = new Icon({
            icon: 'la-long-arrow-alt-left',
            className: 'profile_left_prev-icon',
            events: {
                click: () => renderDom(CHAT_PAGE)
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
                click: () => renderDom(PROFILE_EDIT_PAGE)
            }
        });

        child.EditPassword = new Link({
            text: 'Изменить пароль', 
            events: {
                click: () => renderDom(PROFILE_CHANGE_PASSWORD_PAGE)
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
