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


 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);