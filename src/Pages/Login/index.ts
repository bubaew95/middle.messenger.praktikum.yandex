import { Field } from '../../Components';
import Button from '../../Components/Button';
import Form from '../../Components/Form';
import Link from '../../Components/Link';
import { CHAT_PAGE, REGISTRATION_PAGE, renderDom } from '../../routers';
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
        className: 'login-form_buttons_button button',
        type: 'submit',
        events: {
          click: () => renderDom(CHAT_PAGE)
        }
      });

      const noAccountLink = new Link({
        text: 'Нет аккаунта?',
        containerClassName: 'mx-2',
        className: 'login-form_registration text-center',
        events: {
          click: () => renderDom(REGISTRATION_PAGE)
        }
      });

      child.Form = new Form({
        template: loginForm,
        events: {
          submit: (e: SubmitEvent) => {
            e.preventDefault();

            const login = loginField.getValue();
            const password = passwordField.getValue();
            
            if(login.length === 0 || password.length === 0) {
              return;
            }
            
            console.log({ login,password })
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
