export const sendMessageAction = (message) => {
  return {
    type: 'SEND_MESSAGE',
    message: message
  }
};