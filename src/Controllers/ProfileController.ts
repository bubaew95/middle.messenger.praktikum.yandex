import store from '../utils/Store';
import API, { ProfileAPI, ProfileData } from '../Api/ProfileAPI';
import Router from '../utils/Router';
import { PROFILE_PAGE } from '../utils/Routes';

export class ProfileController {
  private readonly api: ProfileAPI;

  constructor() {
    this.api = API;
  }

  async update(data: ProfileData) {
    try {
      const user = await this.api.update(data);
      store.set('user', user);

      Router.go(PROFILE_PAGE);
    } catch (e: any) {
      store.set('user.error', e.reason);
    }
  }

  async changeAvatar(data) {
    try {
      const user = await this.api.changeAvatar(data);
      console.log('user', user)
    } catch (e: any) {
      store.set('user.error', e.reason);
    }
  }

}

export default new ProfileController();
