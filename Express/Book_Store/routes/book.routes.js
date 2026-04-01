const express = require("express");
const router = express.Router();
const { Books } = require('../db/books'); // import books array from db/books.js
const controller = require('../controller/book.controller'); // import book controller


// routes 
router.get('/' , controller.getAllBooks
); // get all books


router.get('/:id' , controller.getBookById); // get book by id
 

router.post('/' , controller.createBook ); // create a new book

router.delete('/:id' , controller.deleteBook); // delete a book by id

module.exports = router;