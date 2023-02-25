import { Button, Field } from '../../Components';
import Form from '../../Components/Form';
import Block from '../../utils/Block';
import template from './registration.hbs';
import registrationForm from './registration-form.hbs';
import Link from '../../Components/Link';
import { LOGIN_PAGE, renderDom } from '../../routers';

import './registration.pcss';
import ChildType from '../../typings/ChildrenType';
import PhoneValidator from '../../Validators/PhoneValidator';

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
                const email: string  = (e.target as HTMLInputElement).value;
            }
        });

        const loginField = new Field({
            name: 'login',
            label: 'Логин',
            onBlur: (e: FocusEvent) => { 
              const element: string  = (e.target as HTMLInputElement).value; 
              console.log(element)
            }
        });

        const firstNameField = new Field({
            name: 'first_name',
            label: 'Имя',
            onBlur: (e: FocusEvent) => { 
              const element: string  = (e.target as HTMLInputElement).value; 
              console.log(element)
            }
        });

        const secondNameField = new Field({
            name: 'second_name',
            label: 'Фамилия',
            onBlur: (e: FocusEvent) => { 
              const element: string  = (e.target as HTMLInputElement).value; 
              console.log(element)
            }
        });

        const phoneField = new Field({
            name: 'phone',
            label: 'Телефон',
            onBlur: (e: FocusEvent) => { 
              const phone: string  = (e.target as HTMLInputElement).value; 

              phoneField.setProps({
                error: PhoneValidator.validate(phone)
              })

            }
        });

        const passwordField = new Field({
            name: 'password',
            label: 'Пароль',
            type: 'password',
            onBlur: (e: FocusEvent) => { 
              const element: string  = (e.target as HTMLInputElement).value; 
              console.log(element)
            }
        });

        const rePasswordField = new Field({
            name: 're_password',
            label: 'Пароль (ещё раз)',
            type: 'password',
            onBlur: (e: FocusEvent) => { 
              const element: string  = (e.target as HTMLInputElement).value; 
              console.log(element)
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
                console.log({
                  login: loginField.getValue(),
                  password: passwordField.getValue()
                })
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
