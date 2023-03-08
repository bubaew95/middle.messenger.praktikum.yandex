import { Button, Field } from '../../../Components';
import Form from '../../../Components/Form';
import Icon from '../../../Components/Icon';
import ProfileAvatar from '../../../Components/ProfileAvatar';
import PasswordValidatorService from '../../../Services/PasswordValidatorService';
import RePasswordValidatorService from '../../../Services/RePasswordValidatorService';
import { PROFILE_PAGE, renderDom } from '../../../utils/Routes';
import ChildType from '../../../typings/ChildrenType';
import Block from '../../../utils/Block';
import template from './change-password.hbs'; 
import formTemplate from './form.hbs';

export default class ChangePassword extends Block {
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

        child.ChangeAvatar = new ProfileAvatar({
            image: 'https://i.ytimg.com/vi/S_bBS3tUwdU/maxresdefault.jpg',
            isNotEdit: true
        });

        child.PrevButton = new Icon({
            icon: 'la-long-arrow-alt-left',
            className: 'profile_left_prev-icon',
            events: {
                click: () => renderDom(PROFILE_PAGE)
            }
        });
        
        const oldPasswordField = new Field({
            name: 'oldPassword',
            type: 'password',
            placeholder: '*******',
            onBlur: (e: FocusEvent) => {
                const target = (e.target as HTMLInputElement);
                oldPasswordField.setProps({
                    error: 'test'
                })
                console.log(target.value)
            }
        });

        const newPasswordField = new Field({
            name: 'newPassword',
            type: 'password',
            placeholder: '*******',
            onBlur: (e: FocusEvent) => { 
                PasswordValidatorService.check(
                    (e.target as HTMLInputElement).value,
                    newPasswordField
                );
            }
        });

        const rePasswordField = new Field({
            name: 'rePassword',
            type: 'password',
            placeholder: '*******',
            onBlur: (e: FocusEvent) => {
                const rePassword = (e.target as HTMLInputElement).value;
                RePasswordValidatorService.check(
                    newPasswordField.getValue(),
                    rePassword,
                    rePasswordField
                );
            }
        });

        const SaveButton = new Button({
            className: 'button',
            title: 'Сохранить',
            type: 'submit'
        })

        child.ChangePassword = new Form({
            template: formTemplate,
            events: {
                submit: (e: SubmitEvent) => {
                    e.preventDefault();
                    
                    const oldPasswordValue = oldPasswordField.getValue();
                    const newPasswordValue = newPasswordField.getValue();
                    const rePasswordValue = rePasswordField.getValue();
                    
                    if(newPasswordValue.length === 0) {
                        return;
                    }
                    
                    let isError: boolean = false;

                    if(PasswordValidatorService.check(newPasswordValue, newPasswordField)) {
                        isError = true;
                    }

                    if(RePasswordValidatorService.check(newPasswordValue, rePasswordValue, rePasswordField)) {
                        isError = true;
                    }

                    if(isError) {
                        return;
                    }
                    
                    console.log({
                        oldPasswordValue,
                        newPasswordValue,
                        rePasswordValue,
                    })
                }
            }, 
            oldPassword: oldPasswordField,
            newPassword: newPasswordField,
            rePassword: rePasswordField,
            SaveButton
        }) 

    }
    

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
