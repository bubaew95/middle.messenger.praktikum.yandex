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
import { PROFILE_PAGE } from '../../../utils/Routes';
import ChildType from '../../../typings/ChildrenType';
import Block from '../../../utils/Block';
import template from './edit.hbs'; 
import formTemplate from './form.hbs'; 
import { withStore } from '../../../utils/Store';
import ProfileController from '../../../Controllers/ProfileController';
import Router from '../../../utils/Router';

class EditProfileBase extends Block {
    protected init(): void {
        let child: ChildType = this.children;

        child.Modal = new Modal({
            title: 'Загрузите файл',
            body: new Browse({
                onSubmit: (formData: FormData) => {
                    ProfileController.changeAvatar({
                        avatar: formData.get('file')
                    })
                    // console.log(formData.getAll)
                }
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
                click: () => Router.go(PROFILE_PAGE)
            }
        })

        const firstNameField = new Field({
            name: 'first_name',
            onBlur: (e: FocusEvent) => { 
                NameValidatorService.check(
                    (e.target as HTMLInputElement).value, 
                    firstNameField
                );
            },
            value: this.props.first_name
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
            name: 'second_name',
            onBlur: (e: FocusEvent) => {
                NameValidatorService.check(
                    (e.target as HTMLInputElement).value, 
                    secondNameField
                );
            },
            value: this.props.second_name
        });

        const nickname = new Field({
            name: 'display_name',
            onBlur: (e: FocusEvent) => {
                const target = (e.target as HTMLInputElement);
                console.log(target.value)
            },
            value: this.props.display_name
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
            display_name: nickname,
            phone: phoneField,
        });

        const SaveButton = new Button({
            className: 'button',
            title: 'Сохранить',
            type: 'submit'
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

                    ProfileController.update({
                        first_name: firstNameValue,
                        second_name: secondNameValue,
                        display_name: nickNameValue,
                        login: loginValue,
                        email: emailValue,
                        phone: phoneValue
                    });
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



const withProfile = withStore((store) => ({ ...store.user }))

export default withProfile(EditProfileBase as typeof Block);
