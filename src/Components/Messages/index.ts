import Block from '../../utils/Block';
import template from './messages.hbs';
import emptyMessagesTemplate from './partials/empty-messages.hbs';
import formTemplate from './partials/send-form.hbs';
import MessageItem from './MessageItem';
import './messages.pcss';

import data from '../../Api/chats.json'; 
import Field from '../Field';
import Button from '../Button';
import Form from '../Form';
import Icon from '../Icon';
import Action from '../Action';
import List from '../List';
import Modal from '../Modal';
import Browse from '../Modal/Browse';
import ModalForm from '../Modal/Form';
import ChildType from '../../typings/ChildrenType';
import { withStore } from '../../utils/Store'; 
import { getAvatar } from '../../utils/Helpers';
import ChatsController from '../../Controllers/ChatsController';
import MessageWebSoket from '../../Api/MessageWebSoket';

interface IMessageProps {
    id?: string
}

class MessagesBase extends Block {
    private _websocket: any;

    protected componentDidUpdate(oldProps: any, newProps: any): boolean { 
        if(oldProps?.selectedChat?.id !== newProps.selectedChat.id) { 
            return this._addMessagesBlock(newProps);
        }

        return false;
    }

    private socket (chat, user){
        this._websocket = new MessageWebSoket( user.id, chat.id, chat.token );
        
        this._websocket.send(JSON.stringify({
            content: 'Моё первое сообщение миру!',
            type: 'message',
        }));

        this._websocket.onmessage = function (event) {
            console.log('Получены данные', event.data);
        }
    }

    private _addMessagesBlock(props: any) { 
        const {selectedChat, user } = props;
        //this.socket(selectedChat, user.data);

        let child: ChildType = this.children;

        this.setProps({
            title: selectedChat.title,
            avatar: getAvatar(selectedChat.avatar)
        });

        const chats: Array<{[key:string]: any}> = data.filter(
            (item: {[key:string]: any}) => item.id == '63de7124043a64ee89625b18'
        );

        if(chats.length === 0) {
            return false;
        }
        
        
        const chat = chats[0];

        const messages = chat.messages;

        child.Messages = [];
        // if(messages.length !== 0) {  
        //     messages.map((item: {[key: string]: any}) => {
        //         (child.Messages as Array<Block>).push(new MessageItem(item))
        //     }) 
        // } 
        return true;
    }

    private _addFormBlock(child: {[key: string]: Block | Block[]})
    {
        const Input = new Field({
            name: 'message',
            placeholder: 'Сообщение'
        });

        const SendButton = new Button({
            className: 'button',
            title: ` 
                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="5.19995" width="11" height="1.6" fill="white"/>
                    <path d="M7 1L11 6L7 11" stroke="white" stroke-width="1.6"/>
                </svg>
            `,
            type: 'submit'
        });

        const MediaAction = new Action({
            state: 'display-none',
            className: 'settings-block chat_right-column_selected_message-form_actions_block border-shadow-radius',
            List: [
                new List({
                    icon: `octicon-file-media-24`,
                    iconClassName: ' ib-22px primary-color',
                    text: 'Фото или Видео',
                    events: {
                        click: () => {
                            (child.Modal as Block).setProps({
                                title: 'Отправить Фото или Видео',
                                state: 'show',
                                body: new Browse({
                                    onSubmit: (e: SubmitEvent) => {
                                        console.log('Отправить Фото или Видео')
                                    }
                                })
                            })
                        }
                    }
                }),
                new List({
                    icon: `dashicons-media-default`,
                    iconClassName: ' ib-22px primary-color',
                    text: 'Файл',
                    events: {
                        click: () => {
                            (child.Modal as Block).setProps({
                                title: 'Отправить Файл',
                                state: 'show',
                                body: new Browse({
                                    onSubmit: (e: SubmitEvent) => {
                                        console.log('Отправить Файл')
                                    }
                                })
                            })
                        }
                    }
                }),
                new List({
                    icon: `grommet-icons-map-location`,
                    iconClassName: ' ib-22px primary-color',
                    text: 'Локация',
                    events: {
                        click: () => {
                            (child.Modal as Block).setProps({
                                title: 'Отправить Локация',
                                state: 'show',
                                body: new Browse({
                                    onSubmit: (e: SubmitEvent) => {
                                        console.log('Отправить Локация')
                                    }
                                })
                            })
                        }
                    }
                }),
            ]
        });

        const MediaButtons = new Icon({
            className: 'chat_right-column_selected_message-form_actions_icon',
            icon: `ph-paperclip`,
            iconClassName: 'ib-30px gray-color',
            events: {
                click: () => { 
                    const { state } = MediaAction.getProps();
                    MediaAction.setProps({
                        state: state === 'display-block' ? 'display-none' : 'display-block'
                    })
                }
            }
        });

        child.Form = new Form({
            template: formTemplate,
            events: {
                submit: (e: SubmitEvent) => {
                    e.preventDefault();  
                    const message = Input.getValue();

                    if(message.length === 0) {
                        return;
                    }

                    console.log('message', message)
                }
            },
            Input,
            SendButton,
            MediaButtons,
            MediaAction
        });
    }

    protected init(): void { 

        let child: {[key: string]: Block | Block[]} = this.children;

        this._addFormBlock(child);

        const chatAction = new Action({
            state: 'display-none',
            className: 'settings-block chat_right-column_selected_header_actions_block border-shadow-radius',
            List: [
                new List({
                    icon: 'ph-user-plus-fill',
                    iconClassName: 'ib-22px primary-color',
                    text: 'Добавить пользователя',
                    events: {
                        click: () => {
                            (child.Modal as Block).setProps({
                                title: 'Добавить пользователя',
                                state: 'show',
                                body: new ModalForm({
                                    onSubmit: async (login) => {
                                        if(login.length === 0) {
                                            return;
                                        }
                                        await ChatsController.addUserToChat(login, this.props.selectedChat.id);
                                        (child.Modal as Block).setProps({
                                            state: 'hide'
                                        })
                                    }
                                })
                            })
                        }
                    }
                }),
                new List({
                    icon: 'fluent-person-delete-20-filled',
                    iconClassName: 'ib-22px primary-color',
                    text: 'Удалить пользователя',
                    events: {
                        click: () => {
                            (child.Modal as Block).setProps({
                                title: 'Удалить пользователя',
                                state: 'show',
                                body: new ModalForm({
                                    onSubmit: async (login) => {
                                        if(login.length === 0) {
                                            return;
                                        }

                                        await ChatsController.deleteUserFromChat(login, this.props.selectedChat.id);
                                        (child.Modal as Block).setProps({
                                            state: 'hide'
                                        })
                                    }
                                })
                            })
                        }
                    }
                }),
                new List({
                    icon: 'fluent-delete-off-24-filled',
                    iconClassName: 'ib-22px primary-color',
                    text: 'Удалить переписку',
                    events: {
                        click: () => {
                            console.log('click Удалить переписку')
                        }
                    }
                }),
            ]
        });

        const HeaderIcon = new Icon({
            icon: 'entypo-dots-three-vertical',
            iconClassName: 'gray-color',
            className: 'chat_right-column_selected_header_actions_icon',
            events: {
                click: () => {
                    const { state } = chatAction.getProps();
                    chatAction.setProps({
                        state: state === 'display-block' ? 'display-none' : 'display-block'
                    })
                }
            }
        });

        child.HeaderActions = [
            HeaderIcon,
            chatAction, 
        ];

        child.Modal = new Modal({});
    }

    protected render(): DocumentFragment {
        return this.compile(
            !this.props.title ? emptyMessagesTemplate : template, 
            this.props
        )
    }
}

const withMessages = withStore((store) => ({...store}));
export default withMessages(MessagesBase as typeof Block);
