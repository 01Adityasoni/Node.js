const express = require('express');
const app = express();

const PORT = 3000;




app.use(express.json());



let Users = [];

app.get('/' , (req,res) => {
    res.send('Hello World');
})



app.post('/user' , (req,res) => {
    const user = req.body 
    Users.push(user);

    res.status(201).json({
        message: "user created success",
        user
    })
});



app.get("/alluser",(req,res) => {
    res.json(Users);
})


app.get("/user/:id", (req,res) => {
    const id = Number(req.params.id);


    const user = Users.find((u)=>u.id==id);
    if(!user){
        res.send("user not found")
    }
    else{
        res.json(user)
    }
})



app.put('/user/:id' , (req,res) => {
    const id = Number(req.params.id);
    const user = Users.find((u)=>u.id==id);
    if(!user){
        res.send("user not found")

    }
    user.name = req.body.name,
    user.email= req.body.email

    res.json({
      message:  " user updated successfully",
       user
    })
})
app.patch('/user/:id' , (req,res) => {
    const id = Number(req.params.id);
    const user = Users.find((u)=>u.id==id);
    if(!user){
        res.send("user not found")

    }
    user.name = req.body.name,

    res.json({
      message:  " user updated successfully",
       user
    })
})

app.delete('/user/:id',(req,res)=> {
    const id = Number(req.params.id);
    const user = Users.find((u)=> u.id==id);
    if(!user){
        res.send("not found")
    }

    user = Users.filter((u)=> u.id!==id)
})















app.listen(PORT , () =>{
    console.log("app is running")
});
