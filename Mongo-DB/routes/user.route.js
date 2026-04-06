import express from "express";
import user from "../models/user.model.js";
import { randomBytes , createHmac } from "node:crypto";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";
import jwt from "jsonwebtoken";

const router = express.Router();


router.patch('/', ensureAuthenticated, async (req, res) => {
    const {name , age} = req.body;
    await user.findByIdAndUpdate(req.user.id, {name , age});
    return res.status(200).json({message: "User updated successfully"});
});





router.post('/signup', async (req, res) => {
    try {
        const {name , email , password, age} = req.body;

        if (!name || !email || !password || age === undefined) {
            return res.status(400).json({
                message: "name, email, password and age are required"
            });
        }

        const existingUser = await user.findOne({email});

        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        const salt = randomBytes(16).toString('hex');
        const hash = createHmac('sha256', salt).update(password).digest('hex');

        const newUser = await user.create({name , email , password: hash , age, salt});

        return res.status(201).json({status: 'success' , data: {id: newUser._id } } );
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }

});


// login route 

router.post('/login', async (req, res) => {
    const {email , password} = req.body;

const existingUser = await user.findOne({email});

if(!existingUser){
    return res.status(400).json({error: `User with email ${email} does not exist`});
}

const salt = existingUser.salt;
const hash = existingUser.password;

const newHash = createHmac('sha256', salt).update(password).digest('hex');

if(newHash !== hash){
    return res.status(400).json({error: "Invalid password"});
}


const Payload = {
    id: existingUser._id,
    email: existingUser.email,
    name: existingUser.name,
    age: existingUser.age,

};
 
const token = jwt.sign(Payload, process.env.JWT_SECRET, {expiresIn: '1m'});

return res.status(200).json({message: "Login successful", token});
});
export default router;