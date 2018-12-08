

export const subscribeChatEvents = (state = {isConnect: false, newMessage: null, chatMessages: [], clientMessages:[]}, action) => {
  switch(action.type) {
    case 'SEND_MESSAGE':
      return {
        ...state,
        clientMessages:[...state.clientMessages, state.chatMessages.length] //сохраняем номера сообщений текущего клиента
      };
    case 'NEW_MESSAGE':
      console.log('NEW MESSAGE');
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