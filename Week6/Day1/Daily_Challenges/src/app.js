import express from 'express'
const app = express()
import QuizRouter from '../routes/quiz.route.js'
app.use(express.json())


app.listen(3000, ()=> {
    console.log("Server is Runing on Port 3000")
})

app.use('/', QuizRouter)