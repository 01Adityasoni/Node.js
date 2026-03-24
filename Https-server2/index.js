const https = require('http');
const fs = require('fs');


const server = https.createServer((req, res) => {
    const method = req.method;
    const path = req.url;

    const log = `\n${new Date().toISOString()} - ${method} ${path}`;

    fs.appendFileSync('log.txt' , log , 'utf8');

    switch(method){
        case 'GET':{
            switch(path){
                case '/':
                    return res.writeHead(200).end("hello from the server ");
                    case '/contact-us':
                    return res.writeHead(200).end("Sure. Email: adityaaofficial26@gmail.com , mobile: 9424303903");
                    case '/tweet':
                    return res.writeHead(200).end("Here are the latest tweets: ...");
            }
        }
        break;
        case 'POST':{
            switch(path){
                case '/tweet':
                    return res.writeHead(201).end("Tweet posted successfully");
            }
            }
    }
    return res.writeHead(404).end("Not Found");
});



server.listen(8000, () => {
    console.log('Server is listening on port 8000');
});  