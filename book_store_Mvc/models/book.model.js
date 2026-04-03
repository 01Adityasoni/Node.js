
const {pgTable , varchar , uuid , text} = require("drizzle-orm/pg-core");
const authorTable  = require("./author.model");

const bookTable = pgTable("books" , {
    id : uuid("id").primaryKey().defaultRandom(),
    title : varchar("title" , {length : 255}).notNull(),
    description : text("description"),
    authorId : uuid("author_id").references(() => authorTable.id).notNull(),
});

module.exports = bookTable; 