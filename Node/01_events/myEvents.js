// in this file we will learn about events in node js and how to use them
// Events are a fundamental part of Node.js and allow us to create asynchronous, event-driven applications. The EventEmitter class is used to handle events in Node.js. We can create an instance of EventEmitter and use it to emit and listen for events.

// import EventEmitter from 'events'; 



const EventEmitter = require('events');

// Create an instance of EventEmitter
const eventEmitter = new EventEmitter();

// define a event and attach a listener to it
eventEmitter.on('greet', (name) => {
    console.log(`Hello, ${name}!`);
});
eventEmitter.on('greet', (name) => {
    console.log(`Hello, ${name}! welcome to the world of Node.js!`);
});


// define a event that will run only once
eventEmitter.once(`pushnotify`, (message) => {
    console.log(`Push notification run only once : ${message}`);
});






// Emit the event
eventEmitter.emit('greet', 'Aditya');
eventEmitter.emit('pushnotify', 'You have a new message!');
eventEmitter.emit('pushnotify', 'You have a new message!'); // This will not trigger the listener as it is set to run only once
eventEmitter.emit('greet', 'Aditya'); // This will trigger the listener again as it is set to run every time the event is emitted


const myListener = () => {
    console.log('This is a listener for the myEvent event');
    eventEmitter.on("test" , myListener);
    eventEmitter.emit("test");
    eventEmitter.removeListener("test" , myListener);
    eventEmitter.emit("test"); // This will not trigger the listener as it has been removed
}


console.log(eventEmitter.listenerCount('greet')); // This will return the number of listeners for the greet event

