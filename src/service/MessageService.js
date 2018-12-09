import openSocket from 'socket.io-client';

class MessageService {
  static instance = null;

  constructor() {
    if (!MessageService.instance) {
      MessageService.instance = this;
    }
  }

  getUserConnection = (username) => {
      this.socket = openSocket("localhost:8000");
      this.joinChat(username);
  };

  joinChat = (username) => {
    this.socket.emit('join', username);
  };

  subscribe = (eventTitle, eventHandler) => {
    this.socket.on(eventTitle, (data) => eventHandler(data));
  };

  sendMessage = (message) => {
    this.socket.emit('send', message);
  };

}

export const messageService = new MessageService();

