import { pool } from "../config/db.js";

export const getAllBooks = async () => {
    const res = await pool.query("SELECT * FROM books ORDER BY id");
    return res.rows;
}

export const getBooksById = async (id) => {
    const res = await pool.query("SELECT * FROM books WHERE id=$1 ", [id])
    return res.rows[0]
}

export const createBooks = async ({ title, author ,publishedYear}) =>{
    const res = await pool.query("INSERT INTO books (title,author,publishedYear) VALUES($1,$2,$3)", [title,author,publishedYear])
    return res.rows[0]
}