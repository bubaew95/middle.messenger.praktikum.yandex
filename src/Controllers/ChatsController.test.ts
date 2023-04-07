import Sinon from "sinon";
import { ChatsAPI } from "../Api/ChatsApi";
import { ChatsController } from "./ChatsController";
import { expect } from "chai";
import { ProfileAPI } from "../Api/ProfileAPI";

describe('ChatsController', () => {

    const fakeCreate = Sinon.fake();
    const fakeGetToken = Sinon.fake();
    const fakeAddUserToChat = Sinon.fake();
    const fakeDeleteUserToChat = Sinon.fake(); 
    const fakeDeleteChat = Sinon.fake(); 

    const chatsApiMock = class {
        read = () => {};
        create = fakeCreate; 
        getToken = fakeGetToken;
        addUserToChat = fakeAddUserToChat;
        deleteUserFromChat = fakeDeleteUserToChat;
        delete = fakeDeleteChat;
    } as unknown as typeof ChatsAPI;

    const profileApi = class {
        searchUsers = () => {
            return [
                {login: 'noxcho', id: 1},
                {login: 'admin', id: 2}
            ]
        };
    } as unknown as typeof ProfileAPI;

    const chatsApiController = new ChatsController(new chatsApiMock(), new profileApi());

    describe('Create chat', () => {
        it('POST/ correct chat name', async () => {
            await chatsApiController.create('title');
            expect(fakeCreate.calledWith(Sinon.match({title: 'title'}))).to.be.true;
        });

        it('POST/ incorrect chat name', async () => {
            await chatsApiController.create('title');
            expect(fakeCreate.calledWith({test: 'title'})).to.be.false;
        });
    });

    describe('Tokken', () => {
        it('Get', async () => {
            await chatsApiController.getToken(1222);
            expect(fakeGetToken.calledWith(1222)).to.be.true;
        });
    });

    describe('User to Chat', () => {
        it('Add to chat login isset', async () => {
            await chatsApiController.addUserToChat('noxcho', 4);
            expect(fakeAddUserToChat.getCall(0).firstArg).to.be.equal(1);
            expect(fakeAddUserToChat.getCall(0).lastArg).to.be.equal(4);
        });

        it('Add to chat login not found', async () => {
            await chatsApiController.addUserToChat('test', 1);
            expect(fakeAddUserToChat()).to.be.throw;
        });
    });

    describe('Delete User to Chat', () => {
        it('delete to chat login isset', async () => {
            await chatsApiController.deleteUserFromChat('noxcho', 6); 
            expect(fakeDeleteUserToChat.getCall(0).firstArg).to.be.equal(1);
            expect(fakeDeleteUserToChat.getCall(0).lastArg).to.be.equal(6);
        });

        it('Delete to chat login not found', async () => {
            await chatsApiController.addUserToChat('test', 7);
            expect(fakeAddUserToChat()).to.be.throw;
        });
    });

    it('Delete chat', async () => {
        await chatsApiController.deleteChat(4);
        expect(fakeDeleteChat.getCall(0).firstArg).to.be.eq(4);
    })

});
