
const {pgTable , varchar , uuid , text , index } = require("drizzle-orm/pg-core");
const {sql} = require("drizzle-orm/sql");
const authorTable  = require("./author.model");

const bookTable = pgTable("books" , {
    id : uuid("id").primaryKey().defaultRandom(),
    title : varchar("title" , {length : 255}).notNull(),
    description : text("description"),
    authorId : uuid("author_id").references(() => authorTable.id).notNull(),
},
(table) => ({
searchIndexOnTitle: index("title_index").using(
    "gin",sql`to_tsvector('english', ${table.title})`
),
})
    );

module.exports = bookTable; 