const express = require('express');
const http = require('http');
const app = express();
const {Server} = require('socket.io');
const path = require('path');

const server = http.createServer(app);

const io = new Server(server);


// handle socket connection
io.on('connection', (socket) => {
    socket.on('chatMessage', (message) => {
        io.emit('chatMessage', message);
    });
});


app.use(express.static(path.resolve("./public")));

app.get('/', (req, res) => {
    res.sendFile(path.resolve("./public/index.html"));
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

