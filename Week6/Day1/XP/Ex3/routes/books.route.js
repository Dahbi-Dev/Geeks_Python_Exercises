import express from 'express'
import { createBooks, deleteBook, getAllBooks, updateBooks } from '../controllers/books.controller.js';
const router = express.Router()



//  get all Books
router.get('/books', getAllBooks)

// create book
router.post('/books', createBooks)

// update Books :
router.put('/books/:id', updateBooks)

// delete Book
router.delete('/books/:id', deleteBook)







export default router