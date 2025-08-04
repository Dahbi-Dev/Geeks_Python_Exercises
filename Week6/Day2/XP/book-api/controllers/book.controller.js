import * as Books from '../models/books.js'

export const getAllBooks = async (req, res) => {
    try {
        const books = await Books.getAllBooks()
        if (books.length === 0) {
            res.status(404).json("No Posts Try To Create Some")
        } else {
            res.status(200).json(books)
        }
    } catch (error) {
        res.status(400).json({
            message: error.message,
            path: "Get All Books"
        })

    }
}

export const getBookById = async (req, res) => {
    try {
        const founded_Books = await Books.getBooksById(req.params.id)

        if(!founded_Books) return res.status(404).json("Book Not Found")

        res.status(200).json(founded_Books)

    } catch (error) {
        res.status(400).json({
            message: error.message,
            path: "get Books By Id error"
        })
    }
}

export const createBook = async (req, res) => {
    try {
        const {
            title,
            author,
            publishedYear
        } = req.body
        const before = await Books.getAllBooks()
        const newBook = await Books.createBooks({
            title,
            author,
            publishedYear
        })
        const after = await Books.getAllBooks()

        if (after.length > before.length) {
            res.status(201).json(after)
        } else {
            res.status(400).json("Book Not Created")
        }
    } catch (error) {
        res.status(400).json({
            message: error.message,
            path: "create book error"
        })

    }
}