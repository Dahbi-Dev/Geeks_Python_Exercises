import express from 'express'
import * as BookController from '../controllers/book.controller.js';

const router = express.Router()

//  get all books
router.get('/api/books', BookController.getAllBooks)

//  get books By Id
router.get('/api/books/:id', BookController.getBookById)

// create book 
router.post('/api/books',  BookController.createBook)


export default router