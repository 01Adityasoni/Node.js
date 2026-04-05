const express = require('express');
const router = express.Router();
const db = require('../db');
const {userTable} = require('../db/schema');
const {ensureAuthenticated , restrictToRole} = require('../middlewares/auth.middleware');    


const adminRestrictMiddleware = restrictToRole('ADMIN');





router.get('/users', ensureAuthenticated, adminRestrictMiddleware, async (req,res) => {
 
    const users = await db.select({
        id: userTable.id,
        name: userTable.name,
        email: userTable.email
    }).from(userTable);
    return res.json({data: users});
});


module.exports = router;