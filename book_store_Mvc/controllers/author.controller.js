const db = require('../db/index');
const authorTable = require('../models/author.model');
const {eq} = require('drizzle-orm');

// create author
exports.createAuthor = async (req, res) => {
  const { firstName, lastName, email } = req.body;

  const [result] = await db
    .insert(authorTable)
    .values({ firstName, lastName, email })
    .returning({ id: authorTable.id });

  res.json({ id: result.id });
};

// get all authors
exports.getAllAuthors = async (req, res) => {
  const authors = await db.select().from(authorTable);
  res.json(authors);
};