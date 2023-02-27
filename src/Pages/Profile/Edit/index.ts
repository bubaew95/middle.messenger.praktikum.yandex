import { Button, Field, Modal } from '../../../Components';
import Form from '../../../Components/Form';
import Icon from '../../../Components/Icon';
import Browse from '../../../Components/Modal/Browse';
import ProfileAvatar from '../../../Components/ProfileAvatar';
import ProfileData from '../../../Components/ProfileData';
import EmailValidatorService from '../../../Services/EmailValidatorService';
import LoginValidatorService from '../../../Services/LoginValidatorService';
import NameValidatorService from '../../../Services/NameValidatorService';
import PhoneValidatorService from '../../../Services/PhoneValidatorService';
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

        const firstNameField = new Field({
            name: 'name',
            onBlur: (e: FocusEvent) => { 
                NameValidatorService.check(
                    (e.target as HTMLInputElement).value, 
                    firstNameField
                );
            },
            value: this.props.name
        });

        const emailField = new Field({
            name: 'email',
            onBlur: (e: FocusEvent) => {
                EmailValidatorService.check(
                    (e.target as HTMLInputElement).value, 
                    emailField
                ); 
            },
            value: this.props.email
        });

        const loginField = new Field({
            name: 'login',
            onBlur: (e: FocusEvent) => {
                LoginValidatorService.check(
                    (e.target as HTMLInputElement).value, 
                    loginField
                );
            },
            value: this.props.login
        });
        
        const secondNameField = new Field({
            name: 'first_name',
            onBlur: (e: FocusEvent) => {
                NameValidatorService.check(
                    (e.target as HTMLInputElement).value, 
                    secondNameField
                );
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

        const phoneField = new Field({
            name: 'phone',
            onBlur: (e: FocusEvent) => {
                PhoneValidatorService.check(
                    (e.target as HTMLInputElement).value, 
                    phoneField
                ) 
            },
            value: this.props.phone
        });

        const profileData = new ProfileData({
            first_name: firstNameField,
            email: emailField,
            login: loginField, 
            second_name: secondNameField,
            nickname,
            phone: phoneField,
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
                    
                    const firstNameValue = firstNameField.getValue();
                    const emailValue = emailField.getValue();
                    const loginValue = loginField.getValue();
                    const secondNameValue = secondNameField.getValue();
                    const nickNameValue = nickname.getValue();
                    const phoneValue = phoneField.getValue();
                    let isError = false;
                    
                    if(NameValidatorService.check(firstNameValue, firstNameField)) {
                        isError = true;
                    }

                    if(EmailValidatorService.check(emailValue, emailField)) {
                        isError = true;
                    }

                    if(LoginValidatorService.check(loginValue, loginField)) {
                        isError = true;
                    }

                    if(NameValidatorService.check(secondNameValue, secondNameField)) {
                        isError = true;
                    }

                    if(PhoneValidatorService.check(phoneValue, phoneField)) {
                        isError = true;
                    }

                    if(isError) {
                        return;
                    }

                    console.log({
                        firstNameValue,
                        emailValue,
                        loginValue,
                        secondNameValue,
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
