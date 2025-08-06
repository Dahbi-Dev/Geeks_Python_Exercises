-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create hashpwd table
CREATE TABLE IF NOT EXISTS hashpwd (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL REFERENCES users(username) ON DELETE CASCADE,
    password TEXT NOT NULL
);



select * from users


ALTER TABLE users
RENAME COLUMN usersname TO username


drop table users

-- First drop the old constraint:
ALTER TABLE hashpwd DROP CONSTRAINT hashpwd_username_fkey;

-- Add the foreign key again with CASCADE
ALTER TABLE hashpwd
ADD CONSTRAINT hashpwd_username_fkey
FOREIGN KEY (username)
REFERENCES users(username)
ON DELETE CASCADE
ON UPDATE CASCADE;
