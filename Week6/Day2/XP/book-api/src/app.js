import express from 'express'
import booksRouter from '../routes/book.route.js'
import dotenv from  'dotenv'

const app = express()
app.use(express.json())
dotenv.config()
const PORT = process.env.PORT

app.use('/', booksRouter)

app.listen(PORT, ()=> {
    console.log(`Server is Runing on Port ${PORT}`)
})
