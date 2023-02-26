import { Button, Field } from '../../Components';
import Form from '../../Components/Form';
import Block from '../../utils/Block';
import template from './registration.hbs';
import registrationForm from './registration-form.hbs';
import Link from '../../Components/Link';
import { LOGIN_PAGE, renderDom } from '../../routers';

import './registration.pcss';
import ChildType from '../../typings/ChildrenType';
import EmailValidatorService from '../../Services/EmailValidatorService';
import PhoneValidatorService from '../../Services/PhoneValidatorService';
import NameValidatorService from '../../Services/NameValidatorService';
import LoginValidatorService from '../../Services/LoginValidatorService';
import PasswordValidatorService from '../../Services/PasswordValidatorService';
import RePasswordValidatorService from '../../Services/RePasswordValidatorService';

export default class RegistrationPage extends Block {

    constructor(props: {}) { 
        super(props)
    }

    protected init(): void {
        let child: ChildType = this.children;
        
        const emailField = new Field({
            name: 'email',
            label: 'Почта',
            onBlur: (e: FocusEvent) => {  
              EmailValidatorService.check(
                (e.target as HTMLInputElement).value, 
                emailField
              ); 
            }
        });

        const loginField = new Field({
            name: 'login',
            label: 'Логин',
            onBlur: (e: FocusEvent) => {  
              LoginValidatorService.check(
                (e.target as HTMLInputElement).value, 
                loginField
              );
            }
        });

        const firstNameField = new Field({
            name: 'first_name',
            label: 'Имя',
            onBlur: (e: FocusEvent) => {  
              NameValidatorService.check(
                (e.target as HTMLInputElement).value, 
                firstNameField
              );
            }
        });

        const secondNameField = new Field({
            name: 'second_name',
            label: 'Фамилия',
            onBlur: (e: FocusEvent) => {  
              NameValidatorService.check(
                (e.target as HTMLInputElement).value, 
                secondNameField
              );
            }
        });

        const phoneField = new Field({
            name: 'phone',
            label: 'Телефон',
            onBlur: (e: FocusEvent) => { 
              PhoneValidatorService.check(
                (e.target as HTMLInputElement).value, 
                phoneField
              ) 
            }
        });

        const passwordField = new Field({
            name: 'password',
            label: 'Пароль',
            type: 'password',
            onBlur: (e: FocusEvent) => {  
              PasswordValidatorService.check(
                (e.target as HTMLInputElement).value, 
                passwordField
              );
            }
        });

        const rePasswordField = new Field({
            name: 're_password',
            label: 'Пароль (ещё раз)',
            type: 'password',
            onBlur: (e: FocusEvent) => { 
              RePasswordValidatorService.check(
                (e.target as HTMLInputElement).value, 
                passwordField.getValue(), 
                rePasswordField
              );
            }
        });

        const button = new Button({
            title: 'Зарегистрироваться',
            className: 'registration-form_login mx-2 button'
        });

        const enterAccount = new Link({
            text: 'Войти',
            className: 'registration-form_login mx-2',
            events: {
              click: () => renderDom(LOGIN_PAGE)
            }
        });
 
        child.Form = new Form({
            template: registrationForm,
            events: {
              submit: (e: SubmitEvent) => {
                e.preventDefault();
                const emailIsValid = EmailValidatorService.check(emailField.getValue(), emailField);
                const loginIsValid = LoginValidatorService.isValid();
                const firstNameIsValid = NameValidatorService.isValid();
                const secondNameIsValid = NameValidatorService.isValid();
                const phoneIsValid = PhoneValidatorService.isValid(); 
                const passwordIsValid = PasswordValidatorService.isValid();
                const rePasswordIsValid = RePasswordValidatorService.isValid();
                console.log(emailIsValid)
              }
            },
            Button: button,
            Link: enterAccount,
            Inputs: [
                emailField, 
                loginField, 
                firstNameField, 
                secondNameField, 
                phoneField, 
                passwordField, 
                rePasswordField
            ]
        });

    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }

}
