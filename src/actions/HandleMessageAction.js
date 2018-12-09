export const handleMessageAction = (msgText) => {
  return {
    type: 'NEW_MESSAGE',
    newMessage: msgText
  }
};
