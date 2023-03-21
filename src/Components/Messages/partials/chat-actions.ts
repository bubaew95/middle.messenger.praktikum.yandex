import ChatsController from "../../../Controllers/ChatsController";
import Block from "../../../utils/Block";
import Router from "../../../utils/Router";
import { CHAT_PAGE } from "../../../utils/Routes";
import store from "../../../utils/Store";
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

enum Status {
    Success = 'success',
    Error = 'error'
}

function mAlert(modal: Modal, result: {status: string, msg: string}) {
    if(result.status === Status.Success) {
        modal.setProps({
            state: 'hide'
        }); 
        return true;
    }

    modal.setProps({
        title: 'Alert',
        state: 'show',
        body: new Alert({
            text: (result.msg as string),
            status: 'warning'
        })
    });

    return false;
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

                    const result = await ChatsController.addUserToChat(login, chatId);
                    return mAlert(modal, result);
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

                    const result = await ChatsController.deleteUserFromChat(login, chatId);
                    return mAlert(modal, result);
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
    const onSubmit = async () => { 
        const result = await ChatsController.deleteChat(chatId);
        const alert = mAlert(modal, result);

        if(alert) {
            store.set('selectedChat', undefined);
        } 
    }

    return new List({
        icon: 'fluent-delete-off-24-filled',
        iconClassName: 'ib-22px primary-color',
        text: 'Удалить переписку',
        events: {
            click: () => onSubmit()
        }
    });
}

export default function ChatActions(modal: Modal, selectedChat: number, chatCreatedBy: number | undefined) {
    const { user } = store.getState();

    let buttons = [];

    const addUser = AddUserModel(modal, selectedChat);
    const deleteUser = DeleteUserModel(modal, selectedChat);
    const deleteChat = DeleteChat(modal, selectedChat);

    buttons.push(addUser);
    buttons.push(deleteUser);
    buttons.push(deleteChat);

    // if(chatCreatedBy === user.data.id) {
    // } 

    return buttons;

}
