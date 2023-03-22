import API, { AuthAPI, SigninData, SignupData } from '../Api/AuthAPI';
import store from '../utils/Store';
import { LOGIN_PAGE, PROFILE_PAGE } from '../utils/Routes';
import Router from '../utils/Router';

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data); 
      Router.go(PROFILE_PAGE);
    } catch (e: any) {
      store.set('user.signin.error', e.reason);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      Router.go(PROFILE_PAGE);
    } catch (e: any) {
      store.set('user.signup.error', e.reason);
    }
  }

  async fetchUser() {
    const user = await this.api.read();
    store.set('user.data', user);
  }

  async logout() {
    try {
      await this.api.logout();

      Router.go(LOGIN_PAGE);
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new AuthController();
