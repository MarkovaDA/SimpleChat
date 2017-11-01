import { messageService } from './../service/MessageService';

export const subscribeChatEvents = (state = {isConnect: false, newMessage: null, chatMessages: []}, action) => {
  switch(action.type) {
    case 'SEND_MESSAGE':
      messageService.sendMessage(action.message);
      return {
        ...state,
      };
    case 'NEW_MESSAGE':
      //console.log('NEW_MESSAGE', action.newMessage);
      return {
        ...state,
        chatMessages: [...state.chatMessages, action.newMessage]
      };
    case 'CONNECT_SERVER':
      console.log('CONNECT_SERVER');
      return {
        ...state,
        isConnect: true
      };
    case 'UNCONNECT_SERVER':
      console.log('UNCONNECT_SERVER');
      return {
        ...state,
        isConnect: false
      };
    default:
      return state;
  }
};