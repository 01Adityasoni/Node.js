const ChatRoom = require('./chatRoom.js');
const chatRoom = new ChatRoom();

// Listen for events
chatRoom.on('join', (user) => {
    console.log(`${user} has joined the chat room.`);
});

chatRoom.on('message', ({ user, message }) => {
    console.log(`${user}: ${message}`);
});

chatRoom.on('leave', (user) => {
    console.log(`${user} has left the chat room.`);
});
// Simulate chat room activity
chatRoom.join('Aditya');
chatRoom.join('Ram');
chatRoom.sendMessage('Aditya', 'Hello, Ram!');
chatRoom.sendMessage('Ram', 'Hi, Aditya! How are you?');
chatRoom.leave('Aditya');
chatRoom.sendMessage('Aditya', 'I am good, thanks!'); // This will show that Aditya is not in the chat room.    
chatRoom.leave('Ram'); // This will show that Ram is not in the chat room.
