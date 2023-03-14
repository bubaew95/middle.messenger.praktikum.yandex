import ChatsController from "../../../Controllers/ChatsController";
import Action from "../../Action";
import List from "../../List";
import Modal from "../../Modal";
import Alert from "../../Modal/Alert";
import ModalForm from "../../Modal/Form";

export interface ISelectedChat {
    avatar?: string;
    created_by: number;
    id: number
    last_message?: {}
    title: string;
    token: string;
    unread_count: number;
}

interface IChatActions {
    modal: Modal
    selectedChat: ISelectedChat
    userId: number
}

export default function ChatActions(data: IChatActions) {
    const {modal, selectedChat, userId} = data;

    let buttons = [];

    const addUser = new List({
        icon: 'ph-user-plus-fill',
        iconClassName: 'ib-22px primary-color',
        text: 'Добавить пользователя',
        events: {
            click: () => {
                modal.setProps({
                    title: 'Добавить пользователя',
                    state: 'show',
                    body: new ModalForm({
                        onSubmit: async (login) => {
                            if(login.length === 0) {
                                return;
                            }
                            const result = await ChatsController.addUserToChat(login, selectedChat.id);
                            
                            modal.setProps({
                                state: 'hide'
                            });

                            modal.setProps({
                                title: 'Alert',
                                state: 'show',
                                body: new Alert({
                                    text: 'Ошибка',
                                    status: 'warning'
                                })
                            });

                        }
                    })
                })
            }
        }
    });

    const deleteUser = new List({
        icon: 'fluent-person-delete-20-filled',
        iconClassName: 'ib-22px primary-color',
        text: 'Удалить пользователя',
        events: {
            click: () => {
                modal.setProps({
                    title: 'Удалить пользователя',
                    state: 'show',
                    body: new ModalForm({
                        onSubmit: async (login) => {
                            if(login.length === 0) {
                                return;
                            }

                            await ChatsController.deleteUserFromChat(login, selectedChat.id);
                            modal.setProps({
                                state: 'hide'
                            })
                        }
                    })
                })
            }
        }
    });

    const deleteChat = new List({
        icon: 'fluent-delete-off-24-filled',
        iconClassName: 'ib-22px primary-color',
        text: 'Удалить переписку',
        events: {
            click: async () => ChatsController.deleteChat(selectedChat.id)
        }
    });

    buttons.push(addUser);

    if(selectedChat.created_by === userId) {
        buttons.push(deleteUser);
        buttons.push(deleteChat);
    } 

    return new Action({
        state: 'display-none',
        className: 'settings-block chat_right-column_selected_header_actions_block border-shadow-radius',
        List: buttons
    });

}
