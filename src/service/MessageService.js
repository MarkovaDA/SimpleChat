class MessageService {
  static instance = null;

  constructor() {
    if (!MessageService.instance) {
      MessageService.instance = this;
    }
  }

  getConnection = () => {
    this.socket = new WebSocket("ws://localhost:3001");
  };

  on = (eventTitle, eventHandler) => {
    this.socket['on'.concat(eventTitle)] = (event) => eventHandler(event.data);
  };

  sendMessage = (message) => {
    this.socket.send(message);
  };
}

export const messageService = new MessageService();

