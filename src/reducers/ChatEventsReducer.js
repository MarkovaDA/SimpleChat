import Replic from '../models/Replic';
import {messageService} from '../service/MessageService';

export const subscribeChatEvents = (state = {isConnect: false, chatMessages: [], offlineUser: null}, action) => {
  switch(action.type) {
    case 'NEW_MESSAGE':
      const newMessage = Replic.getMessageObject(action.newMessage);
      return {
        ...state,
        chatMessages: [...state.chatMessages, newMessage]
      };
    case 'CONNECT_SERVER':
      messageService.joinUserToChat(action.newUser);
      return {
        ...state,
        isConnect: true
      };
      case 'LEAVE_USER':
        return {
            ...state,
            offlineUser: action.userName
        };
    case 'UNCONNECT_SERVER':
      return {
        ...state,
        isConnect: false
      };
    default:
      return state;
  }
};