const {randomBytes , createHmac} = require('node:crypto'); // used to generate random salt and hash the password
const express = require('express');
const router = express.Router();
const db = require('../db');
const {userTable} = require('../db/schema');
const {eq} = require('drizzle-orm');
const jwt = require('jsonwebtoken');
const { ensureAuthenticated } = require('../middlewares/auth.middleware');
require('dotenv/config');





// shared handler for creating a user
const createUser = async (req, res) => {
    const {name , email , password} = req.body || {};
    if(!name || !email || !password) {
        return res.status(400).json({message: "something is missing , All fields are required"});
    }
    // check if user already exists 
    // if exists return error
    // else create a new user and return success message
    const [existingUser] = await db.select({
        email: userTable.email,
    }).from(userTable).where(eq(userTable.email, email));

    if(existingUser) {
        return res.status(400).json({message: "User already exists"});
    }

    // generate a random salt if user not exists

    const salt = randomBytes(16).toString('hex');

    // hash the password with the salt using HMAC
    const hash = createHmac('sha256', salt).update(password).digest('hex');

    // store the user details in the database
    const insertedUser = await db.insert(userTable).values({
        name,
        email,
        password: hash,
        salt }).returning({id: userTable.id, name: userTable.name, email: userTable.email});
    const user = insertedUser[0];

    return res.json({message: "User created successfully" , user});

};

// create user routes
router.post('/signup' , createUser);



// get all users 

router.get('/' , ensureAuthenticated, async(req,res) => {
    const allUsers = await db.select({
        id: userTable.id,
        name: userTable.name,
        email: userTable.email,
    }).from(userTable);

    return res.json({data: allUsers});
})




// login user and create a JWT token
router.post('/login' , async(req,res) => {
    const {email , password} = req.body || {};
    if(!email || !password) {  
        return res.status(400).json({message: "email and password are required"});
    }
    // check if user exists
    const [existingUser] = await db.select({
        id: userTable.id,
        name: userTable.name,
        email: userTable.email,
        password: userTable.password,
        salt: userTable.salt,
        role: userTable.role
    }).from(userTable).where(eq(userTable.email, email));

    if(!existingUser) {
        return res.status(400).json({message: "user does not exist"});
    }

    const salt = existingUser.salt;
    const hash = createHmac('sha256', salt).update(password).digest('hex');

    if(hash !== existingUser.password) {
        return res.status(400).json({message: "invalid password"});
    }

const payload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
    role: existingUser.role
}
// create a JWT for the user (stateless auth: no token DB storage)
const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1m'});


    // if password is correct create a token for the user and return success message
    return res.json({message: "Login successful" , token: token});

});


// patch route to update user details
router.patch('/' , ensureAuthenticated, async(req,res) => {
    const {name} = req.body;
    await db.update(userTable).set({
        name
    }).where(eq(userTable.id, user.id));

    return res.json({message: "User details updated successfully"});
});




module.exports = router;