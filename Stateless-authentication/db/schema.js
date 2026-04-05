const {uuid , varchar , text , pgTable , timestamp , pgEnum} = require('drizzle-orm/pg-core');

const userRoleEnum = pgEnum('user_role', ['USER', 'ADMIN']);






const userTable = pgTable('users',{
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name',{length: 255}).notNull(),
    email: varchar('email',{length: 255}).notNull().unique(),
    role: userRoleEnum('role').notNull().default('USER'),
    password: text('password',{length: 255}).notNull(),
    salt: text('salt',{length: 255}).notNull()
});



const tokenTable = pgTable('tokens',{
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid().references(() => userTable.id).notNull(),
    token: text('token',{length: 255}).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
});


module.exports = {
    userRoleEnum,
    userTable,
    tokenTable
};

