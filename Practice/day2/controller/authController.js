const User = require("../model/userModel")
const bcrypt = require("bcryptjs")

exports.register = async (req,res) => {

    try{
        const {name , email , password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name , 
            email, 
            password: hashedPassword
        });

        res.json(user);
    }
    catch(err){
        res.status(500).json({message: err.message})

    }

}