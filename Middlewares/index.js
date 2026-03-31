const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 8000
// in memory database
const users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' }
];
// middleware (plugins)
app.use(express.json()); // for parsing application/json
// custom middleware example
// middleware 1 
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
// middleware 2
app.use((req, res, next) => {
    console.log("middleware 2");
    next();
});
// middleware 3
app.use((req, res, next) => {
    console.log("middleware 3");
   // return res.json({ message: "Hello from middleware 3" }); // this will end the request-response cycle and send a response to the client
        next();
});
 // middleware 4 - logging middleware
app.use((req, res, next) => {
    const log = `${new Date().toISOString()} - ${req.method} ${req.url}`;
    fs.appendFileSync('request.log', log + '\n' , 'utf-8');
    next();
});
// types of middleware 
// 1. Application-level middleware (global middleware) Always executed for every request
function loggerMiddleware(req, res, next) {
    const log = `${new Date().toISOString()} - ${req.method} ${req.url}`;
    fs.appendFileSync('log.txt', log + '\n', 'utf-8');
    next();
}
function customMiddleware(req, res, next) {
    console.log("This is a custom middleware");
    next();
}
app.use(loggerMiddleware);
// any kind on request to /books will trigger this middleware
app.use('/books', (req, res, next) => {
    console.log("Books route middleware");
    next();
});
// routes
app.get('/users', (req, res) => {
    res.json(users);
});
 //  Application-level middleware (global middleware) Always executed for every get request to /users
app.get('/users', (req, res) => {
    console.log("get users via middleware ")
    res.json(users);
});
app.get('/users/:id',customMiddleware, (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id)); 
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }   
});
// start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});