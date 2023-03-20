import BaseAPI from "./BaseAPI";

export interface IResource {
    content_size: number;
    content_type: string;
    filename: string;
    id:number;
    path: string;
    upload_date: string;
    user_id: number;
}

export interface IResouseReason extends IResource {
    reason: string;
}

export class ResourcesAPI extends BaseAPI
{
    constructor() {
        super('/resources');
    }

    public sendFile(data: FormData)
    {
        return this.http.post<IResource>('/', data);
    }

    create = undefined;
    read = undefined;
    update = undefined;
    delete = undefined;
}

export default new ResourcesAPI();
