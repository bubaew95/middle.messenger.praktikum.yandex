import { Button, Field, Input, Modal } from '../../../Components';
import Form from '../../../Components/Form';
import Icon from '../../../Components/Icon';
import Browse from '../../../Components/Modal/Browse';
import ProfileAvatar from '../../../Components/ProfileAvatar';
import ProfileData from '../../../Components/ProfileData';
import { PROFILE_PAGE, renderDom } from '../../../routers';
import ChildType from '../../../typings/ChildrenType';
import Block from '../../../utils/Block';
import template from './edit.hbs'; 
import formTemplate from './form.hbs'; 

export default class EditProfile extends Block {
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

        child.Modal = new Modal({
            title: 'Загрузите файл',
            body: new Browse({
                onSubmit: (e: SubmitEvent) => console.log('Загрузите файл')
            })
        });

        child.ChangeAvatar = new ProfileAvatar({
            image: 'https://i.ytimg.com/vi/S_bBS3tUwdU/maxresdefault.jpg',
            onChangeAvatar: () => {
                (child.Modal as Block).setProps({ 
                    state: 'show'
                })
            }
        });

        child.PrevButton = new Icon({
            icon: 'la-long-arrow-alt-left',
            className: 'profile_left_prev-icon',
            events: {
                click: () => renderDom(PROFILE_PAGE)
            }
        })

        const name = new Field({
            name: 'name',
            onBlur: (e: FocusEvent) => {
                const target = (e.target as HTMLInputElement);
                console.log(target.value)
            },
            value: this.props.name
        });

        const email = new Field({
            name: 'email',
            onBlur: (e: FocusEvent) => {
                const target = (e.target as HTMLInputElement);
                console.log(target.value)
            },
            value: this.props.email
        });

        const login = new Field({
            name: 'login',
            onBlur: (e: FocusEvent) => {
                const target = (e.target as HTMLInputElement);
                console.log(target.value)
            },
            value: this.props.login
        });
        
        const first_name = new Field({
            name: 'first_name',
            onBlur: (e: FocusEvent) => {
                const target = (e.target as HTMLInputElement);
                console.log(target.value)
            },
            value: this.props.first_name
        });

        const nickname = new Field({
            name: 'nickname',
            onBlur: (e: FocusEvent) => {
                const target = (e.target as HTMLInputElement);
                console.log(target.value)
            },
            value: this.props.nickname
        });

        const phone = new Field({
            name: 'phone',
            onBlur: (e: FocusEvent) => {
                const target = (e.target as HTMLInputElement);
                console.log(target.value)
            },
            value: this.props.phone
        });

        const profileData = new ProfileData({
            name,
            email,
            login, 
            first_name,
            nickname,
            phone,
        });

        const SaveButton = new Button({
            className: 'button',
            title: 'Сохранить'
        })

        child.EditProfile = new Form({
            template: formTemplate,
            events: {
                submit: (e: SubmitEvent) => {
                    e.preventDefault();
                    
                    const nameValue = name.getValue();
                    const emailValue = email.getValue();
                    const loginValue = login.getValue();
                    const firstNameValue = first_name.getValue();
                    const nickNameValue = nickname.getValue();
                    const phoneValue = phone.getValue();
                    
                    console.log({
                        nameValue,
                        emailValue,
                        loginValue,
                        firstNameValue,
                        nickNameValue,
                        phoneValue,
                    })
                }
            },
            ProfileData: profileData,
            SaveButton
        }) 

    }
    

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
