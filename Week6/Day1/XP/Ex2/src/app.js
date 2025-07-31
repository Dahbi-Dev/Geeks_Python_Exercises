import express from 'express'
const app = express()
import todoRouter from '../routes/todos.route.js'
app.use(express.json())


app.listen(3001, ()=> {
    console.log("Server is Runing on Port 3001")
})

app.use('/', todoRouter)