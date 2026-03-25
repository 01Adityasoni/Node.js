 // here we are going to create our first express server


 // we need to import express
 const express = require('express');

 // we need to create an instance of express
 const app = express();

    // we need to define a port number
    const PORT = 8000;


    // we need to define a route
    app.get('/',(req , res)=>{
        res.send('Hello World');
    });


    app.get('/about',(req , res)=>{
        res.send('This is about page');
    });


    app.post('/tweet' , (req,res) =>{
        res.status(201).send('Tweet created');
    });


    // start the server
    app.listen(PORT,()=>{
        console.log(`Server is up on  ${PORT}`);
    })