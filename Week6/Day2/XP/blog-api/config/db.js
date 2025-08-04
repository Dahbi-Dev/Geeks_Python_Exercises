import db from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = db
export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,    
})