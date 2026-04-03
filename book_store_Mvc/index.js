const express = require('express');
require('dotenv/config');
const bookRoute = require('./routes/book.route');
const authorRoute = require('./routes/author.route');


const app = express();

app.use(express.json());


app.use('/authors', authorRoute);
app.use('/books', bookRoute);



app.listen(3000, () => {
    console.log("app is started")
});