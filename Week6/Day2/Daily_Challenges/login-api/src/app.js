import express from 'express';
import dotenv from 'dotenv'
import LoginRouter from '../routes/users.route.js'

dotenv.config()
const PORT = process.env.PORT || 3000;

const app = express()
app.use(express.json())



app.use('/', LoginRouter)
app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}`)
}) 