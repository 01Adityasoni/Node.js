const express = require('express');
const bookRoutes = require('./routes/book.routes');
const app = express();
const PORT = 8000;
const loggerMiddleware = require('./middleware/logger'); // import logger middleware



// middleware
app.use(express.json()); // to parse json body (middleware plugin) used to parse the body of the request and make it available in req.body
app.use(loggerMiddleware); // use logger middleware for all routes


// routes 
app.use('/books', bookRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
); 