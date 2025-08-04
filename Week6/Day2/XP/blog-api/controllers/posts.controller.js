import * as Post from '../models/posts.js'

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.getAllPosts()
        res.status(200).json(posts)

    } catch (err) {
        res.status(400).json({
            err: err.message
        })
    }

}

export const getPostsById = async (req, res) => {
    try {
        const posts = await Post.getPostsById(req.params.id)
        if (!posts) return res.status(404).json("Post Not Found")
        res.stauts(200).json(posts)

    } catch (error) {
        res.status(400).json({
            err: err.message
        })

    }
}

export const createPost = async (req, res) => {
    try {
        const newPost = await Post.createPost(req.body)
        res.status(201).json({
            message: "Post Created",
            newPost
        })


    } catch (error) {
        res.status(400).json({
            err: err.message
        })
    }
}

export const updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.updatePost(req.params.id, req.body)
        if (!updatedPost) return res.status(404).json("Post Not Found")
        res.status(201).json({
            message: "Post Updated",
            updatedPost
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })

    }
}

export const deletePost = async (req, res) => {
    try {
        const deleted = await Post.deletePost(req.params.id)
        if (deleted === true) {
           return res.json("post has been deleted")

        } else {
           return res.status(404).json("Post Not Found")

        }

    } catch (error) {
        res.status(400).json({
            error: error.message
        })

    }
}