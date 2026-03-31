const db = require('./db');
require('dotenv/config');
const {usersTable} = require('./drizzle/schema');



async function getAllUsers() {
    const users = await db.select().from(usersTable);
    console.log(`users in db`,users);
    return users;
}

async function createUser({id,name, age, email}) {
    await db.insert(usersTable).values({id,name, age, email});
    console.log(`user created with id ${id}`);
}
//createUser({id:1,name:'John Doe', age:30, email:'john.doe@example.com'});
//createUser({id:2,name:'Jane Doe', age:25, email:'jane.doe@example.com'});

getAllUsers();
