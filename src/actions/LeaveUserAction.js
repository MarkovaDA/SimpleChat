export const leaveUserAction = (userName) => {
    return {
        type: 'LEAVE_USER',
        userName: userName
    }
};