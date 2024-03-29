import store from '../utils/Store';
import API, { ProfileAPI, ProfileData, ProfileDataAvatar } from '../Api/ProfileAPI';
import Router from '../utils/Router';
import { PROFILE_PAGE } from '../utils/Routes';

export class ProfileController {
  
  constructor(
    private readonly api: ProfileAPI = API
  ) {
  }

  private setUser(user: ProfileDataAvatar)
  { 
    store.set('user.data', user);
    Router.go(PROFILE_PAGE);
  }

  async update(data: ProfileData) {
    try {
      const user = await this.api.update(data);
      this.setUser(user);
    } catch (e: any) {
      store.set('user.profileUpdate.error', e.reason);
    }
  }

  async changeAvatar(data: FormData) { 
    try {
      const user = await this.api.changeAvatar(data);
      this.setUser(user);
    } catch (e: any) {
      store.set('user.changeAvatar.error', e.reason);
    }
  }

  async changePassword(oldPassword: string, newPassword: string) 
  {
    try {
      await this.api.changePassword({
        oldPassword, newPassword
      });
      
      Router.go(PROFILE_PAGE);
    } catch (e: any) {
      store.set('user.changePassword.error', e.reason);
    }
  }

}

export default new ProfileController();
