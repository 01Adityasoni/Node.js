const express = require('express');
const app = express();
const PORT = process.env.PORT ?? 3000;
const userRoutes = require('./routes/user.routes');
const db = require('./db');
const { users, sessions } = require('./db/schema');
const { eq } = require('drizzle-orm');




app.use(express.json());

app.use(async function(req,res , next){
    const sessionId = req.headers['session-id'];
    if(!sessionId){
        return next();
    }
    const [data] = await db.select({
        sessionId: sessions.id,
        userId: sessions.userId,
        name: users.name,
        email: users.email
    }).from(sessions)
    .rightJoin(users, eq(users.id, sessions.userId))
    .where(eq(sessions.id, sessionId));

    if(!data){
        return next();
    }
    req.user = data;
    next();
    });


app.use('/users', userRoutes);

app.get('/', (req,res) => {
    return res.json({message: "Welcome to the session based authentication"});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 