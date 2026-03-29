const express = require('express');

const app = express();
const PORT = 8000;

// in memory data store
const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: '1984', author: 'George Orwell' },
    {id: 4 , title: 'The courage of living dangerously', author: 'Osho'},
];



// routes 
app.get('/books' , (req,res) => {
    res.json(books);
}); 
// get book by id
app.get('/books/:id' , (req,res) => {
    const id = req.params.id;
    const book = books.find(e => e.id == id); // find book by id
    if(!book) return res.status(404).json({ message: 'Book not found' });
    
    return res.json(book);
})

// post route to add a new book
app.use(express.json()); // to parse json body (middleware plugin) used to parse the body of the request and make it available in req.body


// post route to add a new book
app.post('/books' , (req,res) => {
    const { title , author } = req.body; // get title and author from request body
    if(!title || title ==='') return res.status(400).json({ message: 'Title is required' });
    if(!author || author ==='') return res.status(400).json({ message: 'Author is required' });

    const book = {id: books.length+1, title , author}; // create a new book object with id, title and author
    books.push(book); // add the new book to the books array
    return res.status(201).json({message: 'Book added successfully'}); // return the new book with status code 201 (created)

}) 



// delete a book by id
app.delete('/books/:id' , (req,res) => {
    const id = parseInt(req.params.id); // get id from request params and convert it to integer
    const index = books.findIndex(e => e.id === id);
    
    if(index < 0) return res.status(404).json({ message: 'Book not found' }); // if book not found return 404

    books.splice(index, 1); // remove the book from the books array
    return res.status(200).json({ message: 'Book deleted successfully' }); // return success message

});
   
    
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
); 