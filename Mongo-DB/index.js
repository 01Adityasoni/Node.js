import express from "express";
import { connectDB } from "./connection.js";
import userRoute from "./routes/user.route.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";
import 'dotenv/config';
const app = express();
const PORT = process.env.PORT || 5000;





connectDB(process.env.MONGO_URL).then(() => {
    console.log("Connected to MongoDB");
})


app.use(express.json());
app.use(authMiddleware);

app.use('/user', userRoute);




app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
});
