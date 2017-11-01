export const sendMessageAction = (txtMessage) => {
  return {
    type: 'SEND_MESSAGE',
    message: txtMessage
  }
};