import ChildType from "../../typings/ChildrenType";
import Block from "../../utils/Block";
import Link from "../Link";

import template from './profile-avatar.hbs';

interface IProfileAvatarProps {
    onChangeAvatar?: () => void;
    image?: string;
    isNotEdit?: boolean;
}

export default class ProfileAvatar extends Block {

    constructor(props: IProfileAvatarProps) {
        super(props)
    }

    protected init(): void {
        let child: ChildType = this.children;
        
        if(!this.props.isNotEdit) {
            child.ChangeAvatar = new Link({
                text: 'Поменять аватар',
                className: 'profile_right_info_header_avatar_change-image-block_text',
                events: {
                    click: () => this.props?.onChangeAvatar()
                }
            })
        } 
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.props)
    }

}
