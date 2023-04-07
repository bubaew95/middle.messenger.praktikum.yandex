import { Button, Field } from '../../../Components';
import Form from '../../../Components/Form';
import Icon from '../../../Components/Icon';
import ProfileAvatar from '../../../Components/ProfileAvatar';
import PasswordValidatorService from '../../../Services/PasswordValidatorService';
import RePasswordValidatorService from '../../../Services/RePasswordValidatorService';
import { PROFILE_PAGE } from '../../../utils/Routes';
import ChildType from '../../../typings/ChildrenType';
import Block from '../../../utils/Block';
import template from './change-password.hbs'; 
import formTemplate from './form.hbs';
import Router from '../../../utils/Router';
import { withStore } from '../../../utils/Store';
import ProfileController from '../../../Controllers/ProfileController';
import Text from '../../../Components/Text';
import { getAvatar } from '../../../utils/Helpers';

class ChangePassword extends Block {

    protected componentDidUpdate(_:any, newProps: any): boolean {
        
        if(!!newProps.error) {
            let child: ChildType = this.children;

            child.ErrorMessage = new Text({
                text: newProps.error,
                className: 'error-message'
            });

            return true;
        }

        return false;
    }


    protected init(): void {
        let child: ChildType = this.children;

        const avatar = getAvatar(this.props.avatar);
        
        child.ChangeAvatar = new ProfileAvatar({
            image: avatar,
            isNotEdit: true,
        });

        child.PrevButton = new Icon({
            icon: 'la-long-arrow-alt-left',
            className: 'profile_left_prev-icon',
            events: {
                click: () => Router.go(PROFILE_PAGE)
            }
        });
        
        const oldPasswordField = new Field({
            name: 'oldPassword',
            type: 'password',
            placeholder: '*******'
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

                    ProfileController.changePassword(oldPasswordValue, newPasswordValue);
                }
            }, 
            oldPassword: oldPasswordField,
            newPassword: newPasswordField,
            rePassword: rePasswordField,
            SaveButton
        });
    }
    

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}


const changePassword = withStore((state) => ({ 
    ...state.user.data,
    error: state.user?.changePassword?.error
}));
export default changePassword(ChangePassword as typeof Block);
