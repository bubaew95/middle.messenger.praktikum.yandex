import { expect } from "chai";
import Sinon from "sinon";
import { AuthAPI } from "../Api/AuthAPI";
import {AuthController} from "./AuthController";


describe('AuthController', () => {

    const fake = Sinon.fake();
    
    const AuthApiMock = class {
        signin = fake;
        signup = fake;
        read = fake;
        logout = fake;
    } as unknown as AuthAPI;

    const authController = new AuthController(AuthApiMock);
    
    const loginAndPassword = {
        login: 'Test',
        password: '1234'
    };

    describe('Sign', () => {
 
        it.only('Undefinite', async () => {
            await authController.signin(loginAndPassword); 
            expect(fake()).to.be.undefined; 
        });

        it.only('Shoud create fake without behaviour', async () => {
            await authController.signin(loginAndPassword); 
            expect(fake.callCount).to.be.eq(1);
        });
            
        it.only('Некорретный логин или пароль', async () => {
            await authController.signin({
                login: '',
                password: ''
            }); 
            expect(fake()).to.be.Throw;
        });

        it.only('Проверка параметров', async () => {
            await authController.signin(loginAndPassword);
            
            expect(fake.calledWith(Sinon.match(loginAndPassword))).to.be.true;
        });
    });

});
