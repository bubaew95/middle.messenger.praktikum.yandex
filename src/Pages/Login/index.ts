import { Field } from '../../Components';
import Button from '../../Components/Button';
import Form from '../../Components/Form';
import Link from '../../Components/Link';
import { REGISTRATION_PAGE } from '../../utils/Routes';
import Block from '../../utils/Block';
import template from './login.hbs';
import loginForm from './login-form.hbs';
import './login.pcss'; 
import ChildType from '../../typings/ChildrenType';
import { withStore } from '../../utils/Store'; 
import Router from '../../utils/Router';
import AuthController from '../../Controllers/AuthController';
import Text from '../../Components/Text';

class LoginPageBase extends Block {

    protected componentDidUpdate(oldProps: any, newProps: any): boolean { 
      if(!!newProps.signin && newProps.signin.error) {
        this.children.ErrorMessage = new Text({
          text: newProps.signin.error,
          className: 'error-message' 
        });
        return true;
      }
      return false;
    }

    init() {
      let child: ChildType = this.children;

      const loginField = new Field({
        name: 'login',
        label: 'Логин',
        onBlur: (e: FocusEvent) => { 
          const element: string  = (e.target as HTMLInputElement).value; 
        }
      });
      
      const passwordField = new Field({ 
        name: 'password',
        label: 'Пароль',
        type: 'password',
        onBlur: (e: FocusEvent) => { 
          const element: string  = (e.target as HTMLInputElement).value; 
        }
      });
      
      const button = new Button({
        title: 'Войти',
        className: 'login-form_buttons_button button',
        type: 'submit'
      });

      const noAccountLink = new Link({
        text: 'Нет аккаунта?',
        containerClassName: 'mx-2',
        className: 'login-form_registration text-center',
        events: {
          click: () => Router.go(REGISTRATION_PAGE)
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

            AuthController.signin({ login, password }); 
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

const withUser = withStore((state) => ({ ...state.user }))

export default withUser(LoginPageBase as typeof Block);
