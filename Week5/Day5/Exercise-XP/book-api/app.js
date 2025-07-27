const express = require('express');
const chalk = require('chalk');



const app = express()
app.use(express.json())
const PORT = 5000




const Books = [{
        id: 1,
        title: "1984",
        author: "George Orwell",
        publishedYear: 1949
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        publishedYear: 1960
    },
    {
        id: 3,
        title: "The Great Gatsby",
        author: "F.   Scott Fitzgerald",
        publishedYear: 1925
    },
    {
        id: 4,
        title: "Brave New World",
        author: "Aldous Huxley",
        publishedYear: 1932
    },
    {
        id: 5,
        title: "Fahrenheit 451",
        author: "Ray Bradbury",
        publishedYear: 1953
    },
    {
        id: 6,
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        publishedYear: 1951
    },

]

// app.get('/api/books', (req,res)=>{

// })



// Get All Books
app.get('/api/books', (req, res) => {
    if (Books.length > 1) {
        res.send(Books).status(200)
        console.log(chalk.green.bold("found Books"))
    } else {
        res.status(404).json("Books Not Found")
        console.log(chalk.red.bold("Books Not Found"))
    }

})


// get Books By Id
app.get('/api/books/:bookId', (req, res) => {
    const id = Number(req.params.bookId)
    const foundBook = Books.find(book => book.id === id)

    if (foundBook) {
        res.status(200).json(foundBook)
        console.log(chalk.green.bold("found Book by ID"))
    } else {
        res.status(404).json("Book Not Found")
        console.log(chalk.red.bold("Book Not Found"))
    }

})

// create new books
app.post('/api/books', (req, res) => {
    const newBooks = {
        id: Books.length + 1,
        title: req.body.title,
        author: req.body.author,
        publishedYear: req.body.publishedYear
    }

    if (
        typeof newBooks.publishedYear !== 'number'  ||
        typeof newBooks.title !== 'string'  || newBooks.title === '' ||
        typeof newBooks.author !== 'string'  || newBooks.author === ''
    ) {
        res.status(400).json("Title and author must be strings > 3 , and publishedYear must be a number");
        console.log(chalk.red.bold("Title and author must be strings, and publishedYear must be a number"));
    } else {
        Books.push(newBooks)
        if (Books.length > 6) {
            res.status(201).json(Books)
            console.log(chalk.green.bold("Book Created"))
        } else {
            res.status(400).json("Book Not Created")
            console.log(chalk.red.bold("Book Not Created"))
        }


    }



})









app.listen(PORT, () => {
    console.log(chalk.bgMagenta.white.bold(` Server is Runing on PORT ${PORT} `))
})