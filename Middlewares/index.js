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

// routes
app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
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