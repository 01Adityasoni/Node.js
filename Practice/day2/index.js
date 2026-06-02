const express = require("express")
const connectDB =require("./config/database")
const app = express();
const authRouter = require("./routes/authRoute")
require("dotenv").config();
const PORT = 3000;

app.use(express.json());

connectDB();


app.get('/',(req,res)=>{
    res.json("hello from day2")
});

app.use("/api/auth" , authRouter);

app.listen(PORT , () => {
    console.log(`APP started at ${PORT}`)

})
