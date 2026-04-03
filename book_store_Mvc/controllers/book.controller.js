const db = require('../db/index');
const bookTable = require('../models/book.model')
const {eq , or , ilike} = require('drizzle-orm');
const {sql} = require("drizzle-orm/sql");

exports.getAllBooks = async (req , res) => {
    const search = String(req.query.search || '').trim();
    if(search){
        const books = await db.select().from(bookTable).where(
            or(
                sql`to_tsvector('english', ${bookTable.title}) @@ plainto_tsquery('english', ${search})`,
                ilike(bookTable.title, `%${search}%`)
            )
        );
        return res.json(books);
    }
    const books = await db.select().from(bookTable);
    res.json(books);
};

exports.getBookById = async(req,res) => {
    const {id} = req.params ;
    const [book] = await db.select().from(bookTable).where(eq(bookTable.id , id));
    if(!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
};

exports.createBook = async(req,res) => {
    const {title , description , authorId} = req.body;
    if(!title || title ==='') return res.status(400).json({ message: 'Title is required' });
    if(!authorId || authorId ==='') return res.status(400).json({ message: 'Author ID is required' });
    const [newBook] = await db.insert(bookTable).values({title , description , authorId}).returning({id : bookTable.id , title : bookTable.title , description : bookTable.description , authorId : bookTable.authorId});
    res.status(201).json(newBook);
};

exports.deleteBook = async(req,res) => {
    await db.delete(bookTable).where(eq(bookTable.id , req.params.id));
    res.status(204).send({message : 'Book deleted successfully' });
};