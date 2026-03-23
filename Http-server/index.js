// in this file we will create a simple http server using nodejs and we will log all the incoming requests to a file called server.log

// first we need to import the http module
const http = require('http');

const fs = require('fs');

// then we need to create a server
const server = http.createServer((req, res) => {
    const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n ${req.url}\n`;
    fs.appendFile('server.log', log, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });

    // this function will be called every time we get an incoming request
    console.log("i got an incomming request");
    // we can write the response to the client using the res object
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
});


// listen the server on port 8000
server.listen(8000, () => {
    console.log('Server is listening on port 8000');
});