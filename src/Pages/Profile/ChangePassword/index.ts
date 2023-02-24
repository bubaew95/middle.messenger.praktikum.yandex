import { Button, Field } from '../../../Components';
import Form from '../../../Components/Form';
import Icon from '../../../Components/Icon';
import ProfileAvatar from '../../../Components/ProfileAvatar';
import { PROFILE_PAGE, renderDom } from '../../../routers';
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
        
        const oldPassword = new Field({
            name: 'oldPassword',
            type: 'password',
            placeholder: '*******',
            onBlur: (e: FocusEvent) => {
                const target = (e.target as HTMLInputElement);
                oldPassword.setProps({
                    error: 'test'
                })
                console.log(target.value)
            }
        });

        const newPassword = new Field({
            name: 'newPassword',
            type: 'password',
            placeholder: '*******',
            onBlur: (e: FocusEvent) => {
                const target = (e.target as HTMLInputElement);
                console.log(target.value)
            }
        });

        const rePassword = new Field({
            name: 'rePassword',
            type: 'password',
            placeholder: '*******',
            onBlur: (e: FocusEvent) => {
                const target = (e.target as HTMLInputElement);
                console.log(target.value)
            }
        });

        const SaveButton = new Button({
            className: 'button',
            title: 'Сохранить'
        })

        child.ChangePassword = new Form({
            template: formTemplate,
            events: {
                submit: (e: SubmitEvent) => {
                    e.preventDefault();
                    
                    const oldPasswordValue = oldPassword.getValue();
                    const newPasswordValue = newPassword.getValue();
                    const rePasswordValue = rePassword.getValue();
                    
                    console.log({
                        oldPasswordValue,
                        newPasswordValue,
                        rePasswordValue,
                    })
                }
            }, 
            oldPassword,
            newPassword,
            rePassword,
            SaveButton
        }) 

    }
    

    protected render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}
