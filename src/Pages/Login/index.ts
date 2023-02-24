import { Field } from '../../Components';
import Button from '../../Components/Button';
import Form from '../../Components/Form';
import Link from '../../Components/Link';
import { REGISTRATION_PAGE, renderDom } from '../../routers';
import Block from '../../utils/Block';
import template from './login.hbs';
import loginForm from './login-form.hbs';
import './login.pcss'; 
import ChildType from '../../typings/ChildrenType';

export default class LoginPage extends Block {

    constructor(props: {}) { 
        super(props);
    }

    init() {
      let child: ChildType = this.children;

      const loginField = new Field({
        name: 'login',
        label: 'Логин',
        onBlur: (e: FocusEvent) => { 
          const element: string  = (e.target as HTMLInputElement).value; 
          console.log(element)
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
      
      const button = new Button({
        title: 'Войти',
        className: 'login-form_buttons_button button'
      });

      const noAccountLink = new Link({
        text: 'Нет аккаунта?',
        className: 'login-form_registration text-center mx-2',
        events: {
          click: () => renderDom(REGISTRATION_PAGE)
        }
      });

      child.Form = new Form({
        template: loginForm,
        events: {
          submit: (e: SubmitEvent) => {
            e.preventDefault();
            console.log({
              login: loginField.getValue(),
              password: passwordField.getValue()
            })
          }
        }, 
        LoginField: loginField,
        PasswordField: passwordField,
        Button: button,
        NoAccount: noAccountLink 
      });
    }
  
    render() {
      return this.compile(template, this.props);
    } 
};
