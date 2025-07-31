import express from 'express'
const app = express()
import BookRouter from '../routes/books.route.js'
app.use(express.json())


app.listen(3001, ()=> {
    console.log("Server is Runing on Port 3001")
})

app.use('/', BookRouter)