import Block from '../../utils/Block';
import template from './messages.hbs';
import emptyMessagesTemplate from './partials/empty-messages.hbs';
import formTemplate from './partials/send-form.hbs';
import MessageItem from './MessageItem';
import './messages.pcss';
import Field from '../Field';
import Button from '../Button';
import Form from '../Form';
import Icon from '../Icon';
import Action from '../Action';
import List from '../List';
import Modal from '../Modal';
import Browse from '../Modal/Browse'; 
import ChildType from '../../typings/ChildrenType';
import { withStore } from '../../utils/Store'; 
import { getAvatar } from '../../utils/Helpers';
import ChatActions from './partials/chat-actions';
import MessagesController from '../../Controllers/MessagesController';

interface IMessageProps {
    id?: string
}

class MessagesBase extends Block {
    private _userId: number;
    private _selectedChat: any;
    private _modal: Modal;

    protected componentDidUpdate(oldProps: any, newProps: any): boolean {  
        if(!!newProps.selectedChat && oldProps?.selectedChat?.id !== newProps.selectedChat.id) { 
            return this._addMessages(newProps);
            // const {selectedChat, user } = newProps;
            // this._selectedChat = selectedChat;
            // this._userId = user.data.id;

            // return this._addMessagesBlock(newProps);
        }

        return false;
    }

    private _addMessages(props: any) {
        let child: ChildType = this.children;
        const {selectedChat} = props;

        this.setProps({
            title: selectedChat.title,
            avatar: getAvatar(selectedChat.avatar)
        });

        child.Messages = this.createMessages(props);

        const ChatButtons = new Action({
            state: 'display-none',
            className: 'settings-block chat_right-column_selected_header_actions_block border-shadow-radius',
            List: ChatActions(this._modal, selectedChat)
        });

        const HeaderIcon = new Icon({
            icon: 'entypo-dots-three-vertical',
            iconClassName: 'gray-color',
            className: 'chat_right-column_selected_header_actions_icon',
            events: {
                click: () => {
                    const { state } = ChatButtons.getProps();
                    ChatButtons.setProps({
                        state: state === 'display-block' ? 'display-none' : 'display-block'
                    })
                }
            }
        });

        child.HeaderActions = [
            HeaderIcon, 
            ChatButtons
        ];

        return true;
    }

    private createMessages(props: any) {
        const chatId = props.selectedChat.id;
        const userId = props.user.data.id;

        return props.messages[chatId].map((data: any) => {
          return new MessageItem({...data, isMySelf: userId === data.user_id });
        })
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
                            this._modal.setProps({
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
                            this._modal.setProps({
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
                            this._modal.setProps({
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

                    MessagesController.sendMessage(this.props.selectedChat!.id, message);
                }
            },
            Input,
            SendButton,
            MediaButtons,
            MediaAction
        });
    }

    protected init(): void {
        this._modal = new Modal({});

        let child: {[key: string]: Block | Block[]} = this.children;

        this._addFormBlock(child);
        child.Messages = [];
        child.Modal = this._modal;
    }

    protected render(): DocumentFragment {
        return this.compile(
            !this.props.selectedChat ? emptyMessagesTemplate : template, 
            this.props
        )
    }
}

const withMessages = withStore(state => ({...state}));
export default withMessages(MessagesBase);
