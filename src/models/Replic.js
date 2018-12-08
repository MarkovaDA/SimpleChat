export default class Replic {
    constructor(text, author) {
        this.text = text;
        this.author = author;
        this.time = this.getCurrentDateAndTime();
    }

    getSerializedObject() {
        return JSON.stringify(this);
    }

    getCurrentDateAndTime () {
        const date = new Date();
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    };

    static getMessageObject(message) {
        const {text, author} = JSON.parse(message);
        return new Replic(text,author);
    }
}