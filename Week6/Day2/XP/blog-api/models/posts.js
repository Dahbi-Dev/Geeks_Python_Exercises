import {
    pool
} from "../config/db.js";

export const getAllPosts = async () => {
    const res = await pool.query('SELECT * FROM posts ORDER BY id')
    return res.rows
}

export const getPostsById = async (id) => {
    const res = await pool.query('SELECT * FROM posts WHERE id = $id', [id])
    return res.rows[0]
}

export const createPost = async ({
    title,
    content,
    author
}) => {
    const res = await pool.query('INSERT INTO posts (title,content,author) VALUES ($1,$2,$3) RETURNING * ', [title, content, author])
    return res.rows[0]
}

export const updatePost = async (id, {
    title,
    content,
    author
}) => {
    const res = await pool.query('UPDATE posts SET title=$1, content=$2, author=$3 WHERE id=$4 RETURNING *', [title, content, author, id])
    return res.rows[0]
}
export const deletePost = async (id) => {
    const result =  await pool.query('DELETE FROM posts WHERE id=$1', [id])
      return result.rowCount > 0;


}