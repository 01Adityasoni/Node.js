const { Books } = require('../db/books'); // import books array from db/books.js




exports.getAllBooks = function(req, res) {
    res.json(Books);
};


exports.getBookById = function(req, res) {
        const id = req.params.id;
    const book = Books.find(e => e.id == id); // find book by id
    if(!book) return res.status(404).json({ message: 'Book not found' });
    
    return res.json(book);
};


exports.createBook = function(req, res) {
       const { title , author } = req.body; // get title and author from request body
    if(!title || title ==='') return res.status(400).json({ message: 'Title is required' });
    if(!author || author ==='') return res.status(400).json({ message: 'Author is required' });

    const book = {id: Books.length+1, title , author}; // create a new book object with id, title and author
    Books.push(book); // add the new book to the books array
    return res.status(201).json({message: 'Book added successfully'}); // return the new book with status code 201 (created)
};

exports.deleteBook = function(req, res) {
      const id = parseInt(req.params.id); // get id from request params and convert it to integer
    const index = Books.findIndex(e => e.id === id);
    
    if(index < 0) return res.status(404).json({ message: 'Book not found' }); // if book not found return 404

    Books.splice(index, 1); // remove the book from the books array
    return res.status(200).json({ message: 'Book deleted successfully' }); // return success message
};
