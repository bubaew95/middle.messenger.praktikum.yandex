import { expect } from "chai"; 
import Sinon from "sinon";
import { AuthAPI } from "../Api/AuthAPI";
import {AuthController} from "./AuthController";


describe('AuthController', () => {

    const fakeSignin = Sinon.fake();
    const fakeSignup = Sinon.fake();
    
    const AuthApiMock = class {
        signin = fakeSignin;
        signup = fakeSignup;
    } as unknown as typeof AuthAPI;

    const authController = new AuthController(new AuthApiMock());

    describe('Signin', () => {
        const loginAndPassword = {
            login: 'Test',
            password: '1234'
        };

        it('undefined', async () => {
            await authController.signin(loginAndPassword); 
            expect(fakeSignin()).to.be.undefined; 
        });

        it('Shoud create fake without behaviour', async () => {
            await authController.signin(loginAndPassword); 
            expect(fakeSignin.callCount).to.be.eq(3);
        });
            
        it('Некорретный логин или пароль', async () => {
            await authController.signin({
                login: '',
                password: ''
            });
            expect(fakeSignin()).to.be.Throw;
        });

        it('Проверка параметров', async () => {
            await authController.signin(loginAndPassword);
            expect(fakeSignin.calledWith(Sinon.match(loginAndPassword))).to.be.true;
        });
    });

    describe('Signup', () => {

        const data = {
            first_name: 'Noxcho',
            second_name: 'Shishany',
            login: 'noxcho001',
            email: 'test@mail.ru',
            password: 'Testaf@!11',
            phone: '79999999999',
        };

        it('undefined', () => {
            it('undefined', async () => {
                await authController.signup(data); 
                expect(fakeSignin()).to.be.undefined; 
            });
        });

        it('Некорректные данные', async () => {
            await authController.signup({
                first_name: '',
                second_name: '',
                login: 'noxcho001',
                email: 'test@mail.ru',
                password: 'Testaf@!11',
                phone: '79999999999',
            });
            expect(fakeSignin()).to.be.Throw;
        });

        it('Проверка параметров', async () => {
            await authController.signup(data);
            expect(fakeSignup.calledWith(Sinon.match(data))).to.be.true;
        });

    });

});
