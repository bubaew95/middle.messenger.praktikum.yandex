import API, { AuthAPI, SigninData, SignupData } from '../Api/AuthAPI';
import store from '../utils/Store';
import { LOGIN_PAGE, PROFILE_PAGE } from '../utils/Routes';
import Router, {Router as RouterBase} from '../utils/Router';

export class AuthController {

  constructor(
    private readonly api: AuthAPI = API,
    private readonly router: RouterBase = Router
  ) {
    this.api = api;
    this.router = router;
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data); 
      this.router.go(PROFILE_PAGE);
    } catch (e: any) {
      store.set('user.signin.error', e.reason);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      this.router.go(PROFILE_PAGE);
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

      this.router.go(LOGIN_PAGE);
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new AuthController();
