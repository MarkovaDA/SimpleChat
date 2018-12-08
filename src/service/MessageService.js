import openSocket from 'socket.io-client';

export class MessageService {

    static getConnection = () => {
        if (!this.socket) {
            this.socket = openSocket('http://localhost:8000');
        }

        return this.socket;
    };

    static on = (eventTitle, eventHandler) => {
        //this.socket['on'.concat(eventTitle)] = (event) => eventHandler(event.data);
        this.socket.on(eventTitle, (event) => {
            console.log(eventTitle + 'IIII');
        });
    };
}