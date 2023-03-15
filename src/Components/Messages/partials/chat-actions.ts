import ChatsController from "../../../Controllers/ChatsController";
import Block from "../../../utils/Block";
import Action from "../../Action";
import List from "../../List";
import Modal from "../../Modal";
import Alert from "../../Modal/Alert";
import ModalForm from "../../Modal/Form";
import Spinner from "../../Spinner";

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

function AddUserModel (modal: Modal, chatId: number): Block {
    const onSubmit = () => {
        modal.setProps({
            title: 'Добавить пользователя',
            state: 'show',
            body: new ModalForm({
                onSubmit: async (login) => {
                    if(login.length === 0) {
                        return;
                    }

                    modal.setProps({
                        title: 'Loading',
                        state: 'show',
                        body: new Spinner()
                    });

                    setTimeout(() => {
                        modal.setProps({
                            title: 'Alert',
                            state: 'show',
                            body: new Alert({
                                text: 'Ошибка',
                                status: 'warning'
                            })
                        })
                    }, 4000);

                    // const result = await ChatsController.addUserToChat(login, chatId);
                    
                    // modal.setProps({
                    //     state: 'hide'
                    // }); 
                    

                }
            })
        })
    }

    return new List({
        icon: 'ph-user-plus-fill',
        iconClassName: 'ib-22px primary-color',
        text: 'Добавить пользователя',
        events: {
            click: () => onSubmit()
        }
    });
}

function DeleteUserModel(modal: Modal, chatId: number) : Block {
    const onSubmit = () => {
        modal.setProps({
            title: 'Удалить пользователя',
            state: 'show',
            body: new ModalForm({
                onSubmit: async (login) => {
                    if(login.length === 0) {
                        return;
                    }

                    await ChatsController.deleteUserFromChat(login, chatId);
                    modal.setProps({
                        state: 'hide'
                    })
                }
            })
        })
    }

    return new List({
        icon: 'fluent-person-delete-20-filled',
        iconClassName: 'ib-22px primary-color',
        text: 'Удалить пользователя',
        events: {
            click: () => onSubmit()
        }
    });
}

function DeleteChat(modal: Modal, chatId: number) : Block {
    return new List({
        icon: 'fluent-delete-off-24-filled',
        iconClassName: 'ib-22px primary-color',
        text: 'Удалить переписку',
        events: {
            click: async () => ChatsController.deleteChat(chatId)
        }
    });
}

export default function ChatActions(data: IChatActions) {
    const {modal, selectedChat, userId} = data;

    let buttons = [];

    const addUser = AddUserModel(modal, selectedChat.id);
    const deleteUser = DeleteUserModel(modal, selectedChat.id);
    const deleteChat = DeleteChat(modal, selectedChat.id);

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
