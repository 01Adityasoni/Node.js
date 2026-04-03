const {pgTable , varchar , uuid} = require("drizzle-orm/pg-core");

const authorTable = pgTable("authors" , {
    id : uuid("id").primaryKey().defaultRandom(),
    firstName : varchar("first_name" , {length : 255}).notNull(),
    lastName : varchar("last_name" , {length : 255}),
    email: varchar("email" , {length : 255}).notNull().unique()
});

module.exports = authorTable;