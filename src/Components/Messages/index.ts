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
import { DateFormat, getAvatar, getFile } from '../../utils/Helpers';
import ChatActions from './partials/chat-actions';
import MessagesController from '../../Controllers/MessagesController';
import { ChatData } from '../../Api/ChatsApi';  
import { IResource } from '../../Api/ResourcesAPI';

class MessagesBase extends Block {
    private _modal: Modal;

    protected componentDidUpdate(oldProps: any, newProps: any): boolean { 
        
        if(newProps.selectedChat != oldProps.selectedChat) {
            return this._addMessages(newProps);
        }

        let child: ChildType = this.children;
        child.Messages = this.createMessages(newProps);
        return true;
    }

    private _addMessages(props: any) {
        let child: ChildType = this.children; 
        const { selectedChat, chatCreatedBy } = props;

        const ChatButtons = new Action({
            state: 'display-none',
            className: 'settings-block chat_right-column_selected_header_actions_block border-shadow-radius',
            List: ChatActions(this._modal, selectedChat, chatCreatedBy)
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
        const userId = props.userId;
        return props.messages.map((data: any) => {
            return new MessageItem({
                ...data, 
                isMySelf: userId === data.user_id,
                media: data.type === 'file' ? getFile(data.file) :  null,
                time: data.time && DateFormat(data.time)
            });
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
                                    name: 'resource',
                                    accept: 'image/*, video/*',
                                    onSubmit: async (formData: FormData) => {
                                        const file: IResource = await MessagesController.sendFile(formData);
                                        MessagesController.sendMessage(this.props.selectedChat, (file.id).toString(), 'file');
                                        this._modal.setProps({
                                            show: 'hide'
                                        })
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
                                    name: 'resource',
                                    accept: '.pdf, .txt, .xls, .word',
                                    onSubmit: async (formData: FormData) => {
                                        const file: IResource = await MessagesController.sendFile(formData);
                                        MessagesController.sendMessage(this.props.selectedChat, (file.id).toString(), 'file');
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
                                    onSubmit: () => {
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

                    Input.setValue('');

                    MessagesController.sendMessage(this.props.selectedChat, message);
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

const withMessages = withStore(state => {
    const selectedChatId = state.selectedChat; 
    function getChat(chatId: number) {
        return state.chats.filter((item: ChatData) => item.id === chatId)[0];
    }

    if (!selectedChatId) {
        return {
            messages: [],
            selectedChat: undefined,
            userId: state.user.data.id,
            title: undefined,
            avatar: undefined,
            chatCreatedBy: undefined
        };
    }

    const chat: ChatData = getChat(selectedChatId);

    return {
        messages: (state.messages || {})[selectedChatId] || [],
        selectedChat: state.selectedChat,
        userId: state.user.data.id,
        title: chat && chat.title,
        avatar: chat && getAvatar(chat.avatar),
        chatCreatedBy: chat && chat.created_by
    };
});

export default withMessages(MessagesBase as typeof Block);
