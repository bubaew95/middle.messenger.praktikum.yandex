import Sinon from "sinon";
import {ProfileAPI} from "../Api/ProfileAPI";
import { ProfileController } from "./ProfileController";
import { expect } from "chai";


describe('Profile', () => {
  
    const fakeUpdate = Sinon.fake();
    const fakeChangePassword = Sinon.fake();

    const ProfileApi = class {

        update = fakeUpdate;
        changePassword = fakeChangePassword;

    } as unknown as typeof ProfileAPI;

    const profileApiController = new ProfileController(new ProfileApi());

    it('Update data', () => {
        const data = {
            first_name: 'first_name',
            second_name: 'second_name',
            display_name: 'display_name',
            login: 'login',
            email: 'email@mail.ru',
            phone: '79999999999',
        };

        profileApiController.update(data);
        expect(fakeUpdate.calledWith(Sinon.match(data))).to.be.true;
    });

    describe('ChangePassword', () => {
        it('Correct', () => {
            profileApiController.changePassword('test', '12345');
            expect(fakeChangePassword.calledWith(Sinon.match({ oldPassword: 'test', newPassword: '12345' })))
                .to.be.true;
        });

        it('Exception', () => {
            profileApiController.changePassword('', '');
            expect(fakeChangePassword()).to.be.throw;
        });
    });
});
