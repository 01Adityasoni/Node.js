const express = require("express");
const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');
const { authenicationMiddleware } = require('./middlewares/auth.middleware');
const db = require('./db');
const app = express();
const PORT = 8000;
const jwt = require('jsonwebtoken');
require('dotenv/config');







app.use(express.json());
app.use(authenicationMiddleware);



// default route
app.get('/' , (req,res) => {
    return res.json({message: "Welcome to the stateless authentication"});
});




// get all users route
app.use('/users' , userRoutes);


// admin routes
app.use('/admin' , adminRoutes);


app.listen(PORT,() => {
    console.log(`app is running in ${PORT} `);
})
 