const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

eventEmitter.on('error' , (err) => {
    console.error('An error occurred: ' + err.message);
});

// Trigger the error event
eventEmitter.emit('error', new Error('Something went wrong!'));