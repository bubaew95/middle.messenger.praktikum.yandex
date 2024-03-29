import Block from '../../utils/Block';
import template from './chat.hbs';
import { withStore } from '../../utils/Store';
import ChatItem from '../ChatItem';
import ChatsController from '../../Controllers/ChatsController';
import Spinner from '../Spinner';
import { DateFormat, getAvatar, Substr } from '../../utils/Helpers';

class ChatsBase extends Block {

    protected init() {
      let child: {[key: string]: Block | Block[]} = this.children;
      child.chats = [new Spinner()];
    }
  
    protected componentDidUpdate(_oldProps: any, newProps: any): boolean {
      if(!!newProps.chats) {
        let child: {[key: string]: Block | Block[]} = this.children;
        child.chats = this.createChats(newProps);
        return true;
      }
      return false;
    }
  
    private createChats(props: any) {
      return props.chats.map((data: any) => {
        return new ChatItem({
          ...data,
          avatar: data.avatar && getAvatar(data.avatar),
          last_message: data.last_message?.content && Substr(data.last_message.content),
          last_message_time: data.last_message?.time && DateFormat(data.last_message.time),
          events: {
            click: () => {
              ChatsController.selectChat(data.id);
            }
          }
        });
      })
    }
  
    protected render(): DocumentFragment {
      return this.compile(template, { ...this.props });
    }
  }
  
  const withChats = withStore((state) => ({chats: [...(state.chats || [])]}));
  
  export default withChats(ChatsBase as typeof Block);
  