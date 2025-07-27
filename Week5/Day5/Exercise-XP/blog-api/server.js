const express = require('express');
const chalk = require('chalk');


const app = express()
app.use(express.json())
const PORT = 5000;
  

const data = [{
        id: 1,
        title: "Title 1 ",
        content: "content 1"
    },
    {
        id: 2,
        title: "Title 2 ",
        content: "content 2"
    },
    {
        id: 3,
        title: "Title 3",
        content: "content 3"
    }
]


// all blogs
app.get('/posts', (req, res) => {
    if (res.json(data)) {
        console.log(chalk.blue("All Post Api"))
    } else {
        res.status(400).json("No Data")
        console.log(chalk.red("No Data"))

    }
})


// get posts by id
app.get('/posts/:postID', (req, res) => {
    const id = Number(req.params.postID)
    const postsResult = data.find(post => post.id === id)

    if (!postsResult) {
        res.status(404).json("Post Not Found")
    }

    res.status(200).json(postsResult)
    console.log(chalk.yellow("Post By ID Api"))
})


// create new posts
app.post('/posts', (req, res) => {
    const newPost = {
        id: data.length + 1,
        title: req.body.title,
        content: req.body.content
    }

    data.push(newPost)
    res.status(201).json(newPost)
    console.log(chalk.magenta("Create Post Api"))

})

// update posts
app.put('/posts/:postID', (req, res) => {
    const id = Number(req.params.postID)
    const index = data.findIndex(post => post.id === id)
    if (index === -1) {
        return res.status(404).json("Not Found")

    }

    const updatedPosts = {
        id: data[index].id,
        title: req.body.title,
        content: req.body.content
    }

    data[index] = updatedPosts
    res.status(200).json(data)
    console.log(chalk.bold.green("Post Updated"))
})

// Delet posts
app.delete('/posts/:postID', (req, res) => {
    const id = Number(req.params.postID)
    const index = data.findIndex(post => post.id === id)

    if (index === -1) {
        return res.status(404).json("Not Found")
    }

    data.splice(index, 1)
    res.status(200).json({
        message: "post deleted",
        newData: data
    })
    console.log(chalk.red.bold.bgWhite("Post Delete"))

})



app.listen(PORT, () => {
    console.log(chalk.italic.bold.underline.green(`Server running on port ${PORT}`))
});