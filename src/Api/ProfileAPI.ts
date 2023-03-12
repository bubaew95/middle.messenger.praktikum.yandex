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

export class ProfileAPI extends BaseAPI 
{
    constructor() {
        super('/user');
    }

    public update(data: ProfileData): Promise<ProfileDataAvatar> {
        return this.http.put('/profile', data);
    }

    public changeAvatar(data) {
        return this.http.put('/profile/avatar', data);
    }

    read = undefined; 
    create = undefined; 
    delete = undefined;
}

export default new ProfileAPI();
