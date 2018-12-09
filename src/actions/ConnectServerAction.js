export const connectNotifyAction = (newUser) => {
  return {
    type: 'CONNECT_SERVER',
    newUser: newUser
  }
};