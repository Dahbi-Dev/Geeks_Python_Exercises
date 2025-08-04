import express from 'express'
import { createPost, deletePost, getAllPosts, getPostsById, updatePost } from '../controllers/posts.controller.js'
const router = express.Router()


router.get('/posts', getAllPosts)

router.get('/posts/:id', getPostsById)

router.post('/posts', createPost)

router.put('/posts/:id', updatePost)

router.delete('/posts/:id', deletePost)

export default router