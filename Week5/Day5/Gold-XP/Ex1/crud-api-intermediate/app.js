const experss = require('express')
const fetchData = require('./data/dataService.js')
const chalk = require('chalk')

const app = experss();
app.use(experss.json());
const PORT = 5000;



app.get('/api/posts', async (req, res) => {
  try {
    const posts = await fetchData()
    if (posts) {
      res.status(200).json({
        message: "Fetched All Posts",
        posts
      })
      console.log(chalk.magenta.bold('Api Fetched Successfully'))
    } else {
      res.status(404).json("post not found")
      console.log(chalk.red.bold('Not Found'))
    }
  } catch (error) {
    console.error(error)
  }
})


// Fetch Posts by id
app.get('/api/posts/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const posts = await fetchData()
    const founded_posts = posts.find(post => post.id === id)

    if (founded_posts) {
      res.status(200).json(founded_posts)
      console.log(chalk.magenta.bold("Fetched Posts By ID Api"))
    } else {
      res.status(404).json("Post Not Found")
      console.log(chalk.red.bold("Post ID Not Found"))

    }
  } catch (error) {
    console.error(error)

  }
})


// Create New Posts 
app.post('/api/posts', async (req, res) => {
  try {
    let count = 0;
    const posts = await fetchData()
    const maxUserId = Math.max(...posts.map(post => post.userId || 0))

    const newPosts = {
      "userId": maxUserId + 1,
      "id": posts.length + 1,
      "title": req.body.title,
      "body": req.body.body
    }

    posts.push(newPosts)
    if (posts.length > 100) {
      count += 1
      res.status(201).json(posts)
      console.log(chalk.yellow.bold(`Create Post APi Success Request Number : ${count}`))
    } else {
      res.status(204).json("Field to Create")
      console.log(chalk.red.bold("Post Not Created Api"))
    }


  } catch (error) {
    console.error(error)
  }
})




// Update Posts
app.put('/api/posts/:id', async (req, res) => {
  try {
    const posts = await fetchData()
    const id = Number(req.params.id)
    const index = posts.findIndex(post => post.id === id)

    if (index === -1) {
      res.status(404).json("Post Not Found")
      console.log(chalk.red("Post Not Found"))
    }

    const updatedPosts = {
      "userId": posts[index].userId,
      "id": posts[index].id,
      "title": req.body.title,
      "body": req.body.body,
    }


    posts[index] = updatedPosts
    res.status(200).json(posts)
    console.log(chalk.green.bold("Post Updated"))



  } catch (error) {
    console.error(error)
  }
})


// Delete Posts By ID
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const posts = await fetchData()
    const id = Number(req.params.id)
    const index = posts.findIndex(post => post.id === id)
    if (index === -1) {
      res.status(404).json("Post Not Found")
      console.log(chalk.red("Post Not Found"))
    }

    posts.splice(index, 1)
    res.status(200).json(posts)
    console.log(chalk.green.bold("Post Deleted"))

  } catch (error) {

  }
})


app.listen(PORT, () => {
  console.log(chalk.green.bold.underline(`Server is Runing ... on port ${PORT}`))
})