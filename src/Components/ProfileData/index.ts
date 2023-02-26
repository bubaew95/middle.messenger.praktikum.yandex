import Block from "../../utils/Block";
import Input from "../Input";
import template from './profile-data.hbs';

interface IProfileDataProps {
    email: string | Input,
    login: string | Input,
    first_name: string | Input,
    second_name: string | Input,
    nickname: string | Input,
    phone: string | Input,
}

export default class ProfileData extends Block {

    constructor(props: IProfileDataProps) { 
        super(props)
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }

}
