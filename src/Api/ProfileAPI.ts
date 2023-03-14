import BaseAPI from './BaseAPI';

export interface ProfileData {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

export interface ProfileDataAvatar extends ProfileData {
    avatar: string;
}

export interface IUserData extends ProfileDataAvatar {
    id: number;
}

export interface ProfileChangePassword {
    oldPassword: string;
    newPassword: string;
}

export class ProfileAPI extends BaseAPI 
{
    constructor() {
        super('/user');
    }

    public update(data: ProfileData): Promise<ProfileDataAvatar> {
        return this.http.put('/profile', data);
    }

    public changeAvatar(data: FormData): Promise<ProfileDataAvatar> {
        return this.http.put('/profile/avatar', data);
    }

    public changePassword(data: ProfileChangePassword): Promise<any> {
        return this.http.put('/password', data);
    }

    public searchUsers(login: string): Promise<IUserData[]> {
        return this.http.post('/search', {login});
    }

    read = undefined; 
    create = undefined; 
    delete = undefined;
}

export default new ProfileAPI();
