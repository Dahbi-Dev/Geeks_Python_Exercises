const express = require('express')
const chalk = require('chalk')
const fetchData = require('./data/dataService.js')
const app = express()
app.use(express.json())
const PORT = 5000





    // Get All Posts
    app.get('/api/posts', async (req,res)=>{
       try {
        const posts = await fetchData()
         if (posts.length >= 1) {
            res.status(200).json({posts})       
            console.log(chalk.green.bold("Get All Posts"))     
        } else {
            res.status(404).json("Posts not found")
            console.log(chalk.red.bold("Posts Not Found"))     
            
        }
       } catch (error) {
        console.error(chalk.red(error))
       }
    })


  




app.listen(PORT, ()=>{
    console.log(chalk.green.bgWhite.bold.underline(`Server is Runing on Port ${PORT}`))
})