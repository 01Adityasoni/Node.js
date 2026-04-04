const {integer , pgTable , varchar,uuid,text , timestamp} = require('drizzle-orm/pg-core');
const e = require('express');

const users = pgTable('users',{
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name',{length: 255}).notNull(),
    email: varchar('email',{length: 255}).notNull().unique(),
    password: text('password',{length: 255}).notNull(),
    salt: text('salt',{length: 255}).notNull()
});




 const sessions = pgTable('sessions',{    
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid().references(() => users.id).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
});

module.exports = {
    users,
    sessions
}

