const express = require('express');
const app = express();
const port = 3000;



app.use(express.json());


const DB = {}
const EMAILS = new Set();


app.post('/signup', (req,res) => {
    const {name , email, password} = req.body;
    if(EMAILS.has(email)){
        return res.status(400).json({message: "User already exists"});
    }

    const toker = `${Date.now()}`;
    DB[toker] = {
        name,
        email,
        password
    }
    EMAILS.add(email);
    return res.json({message: "User created successfully", token: toker});
} );


app.post('/me', (req,res) => {
    const {token} = req.body;
    if(!token){
        return res.status(400).json({message: "Token is required"});
    }

    if(!(token in DB)){
        return res.status(400).json({message: "Invalid token"});
    }

    const user = DB[token];
    return res.json({data: user});
});

// only visible to the user who is logged in

app.post('/private-data', (req,res) => {

const {token} = req.body;
if(!token){
    return res.status(400).json({message: "Token is required"});
}
if(!(token in DB)){
    return res.status(400).json({message: "Invalid token"});
}
const user = DB[token];
return res.json({data: `This is private data for ${user.name}`});
});




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});