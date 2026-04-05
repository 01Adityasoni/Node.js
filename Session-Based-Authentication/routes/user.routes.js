const { randomBytes, createHmac } = require('node:crypto');
const express = require('express');
const router = express.Router();
const db = require('../db');
const { users } = require('../db/schema');
const { eq } = require('drizzle-orm');
const { sessions } = require('../db/schema');





// patch route to update user details (name and email) only if the user is logged in

router.patch('/', async (req, res) => {

    const user = req.user;
    if(!user) {
        return res.status(401).json({error: "you are not logged in"});
    }
    const {name} = req.body;
    await db.update(users).set({
        name
    }).where(eq(users.id, user.userId));

    return res.json({message: "User details updated successfully"});
});




// return all users

router.get('/', async (req, res) => {
    const allUsers = await db.select({
        id: users.id,
        name: users.name,
        email: users.email,
    }).from(users);

    return res.json({ data: allUsers });
}); 
 

router.post('/signup', async (req, res) => { // create a new user
    const { name, email, password } = req.body ?? {};
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'name, email and password are required' });
    }

    // check if user already exists
    // if exists return error
    // else create a new user and return success message
    const [existingUser] = await db.select({
        email: users.email,
    }).from(users)
    .where(eq(users.email, email));

    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const salt = randomBytes(16).toString('hex'); // in real world applications use a unique salt per user
    const hashedPassword = createHmac('sha256', salt)
        .update(password)
        .digest('hex'); // in production use bcrypt/argon2 instead of sha256+hmac

    const insertedUsers = await db.insert(users).values({
        name,
        email,
        password: hashedPassword,
        salt
    }).returning({ id: users.id, name: users.name, email: users.email });

    const user = insertedUsers[0];

    return res.status(201).json({ message: 'User created successfully', data: user });
});

 



router.post('/login' , async(req,res) => {
    const {email, password} = req.body ?? {};
    const [existingUser] = await db
    .select({
        id: users.id,
        email: users.email,
        salt: users.salt,
        password: users.password

    })
    .from(users)
    .where(eq(users.email, email));

    if(!existingUser){
        return res.status(400).json({message: "User does not exist"});
    }

    const salt = existingUser.salt;
    const existingHash = existingUser.password 

    const newHash = createHmac('sha256', salt)
    .update(password)
    .digest('hex');

    if(newHash !== existingHash){
        return res.status(400).json({message: "Invalid  password"});
    }

    const [Usersession] = await db.insert(sessions).values({
        userId: existingUser.id
    }).returning({id: sessions.id});
    // if password is correct create a session for the user and return success message
    return res.json({message: "Login successful", sessionId: Usersession.id});


}); // login user and create a session for the user



module.exports = router;
