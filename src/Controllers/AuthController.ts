import API, { AuthAPI, SigninData, SignupData } from '../Api/AuthAPI';
import store from '../utils/Store';
import router from '../utils/Router';

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);

      router.go('/chats');
    } catch (e: any) {
      store.set('user.signin.error', e.reason);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      router.go('/profile');
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

      router.go('/');
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new AuthController();