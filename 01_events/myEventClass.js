// import EventEmitter from 'events';
const EventEmitter = require('events');
// Create a class that extends EventEmitter
class Chat extends EventEmitter {
    sendMessage(message) {
        console.log(`Message sent: ${message}`);
        this.emit('messageSent', message);
    }
}

// Create an instance of the Chat class
const chat = new Chat();
chat.on('messageSent', (message) => {
    console.log(`Message received: ${message}`);
});
// Send a message
chat.sendMessage('Hello, World!');