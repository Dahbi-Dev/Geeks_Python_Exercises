import express from 'express'
const router = express.Router()

router.get('/', (req,res)=> {
    res.json("Home Page")
})

router.get('/about', (req,res)=> {
    res.json("About Page")
})


export default router