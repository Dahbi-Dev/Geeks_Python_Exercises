import express from "express";
import postRouter from '../routes/posts.route.js'
import dotenv from 'dotenv'

dotenv.config()
const app = express();

app.use(express.json())

app.use('/', postRouter)



const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});