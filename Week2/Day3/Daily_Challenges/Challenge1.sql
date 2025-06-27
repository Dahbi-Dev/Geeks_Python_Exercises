
-- Part I: One-to-One Relationship

-- Create Customer table
CREATE TABLE customer (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL
);

-- Create Customer Profile table with One-to-One relationship
CREATE TABLE customer_profile (
    id SERIAL PRIMARY KEY,
    isLoggedIn BOOLEAN DEFAULT false,
    customer_id INTEGER UNIQUE REFERENCES customer(id)
);

-- Insert customers
INSERT INTO customer (first_name, last_name) VALUES
('John', 'Doe'),
('Jerome', 'Lalu'),
('Lea', 'Rive');

-- Insert profiles using subqueries
INSERT INTO customer_profile (isLoggedIn, customer_id)
VALUES
(true, (SELECT id FROM customer WHERE first_name = 'John')),
(false, (SELECT id FROM customer WHERE first_name = 'Jerome'));

-- 1. Display first_name of logged-in customers
SELECT c.first_name
FROM customer c
JOIN customer_profile cp ON c.id = cp.customer_id
WHERE cp.isLoggedIn = true;

-- 2. Display all customers and their isLoggedIn status
SELECT c.first_name, cp.isLoggedIn
FROM customer c
LEFT JOIN customer_profile cp ON c.id = cp.customer_id;

-- 3. Count number of customers that are not logged in
SELECT COUNT(*)
FROM customer c
JOIN customer_profile cp ON c.id = cp.customer_id
WHERE cp.isLoggedIn = false;

-- Part II: Many-to-Many Relationship with Book Borrowing

-- Create Book table
CREATE TABLE book (
    book_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL
);

-- Insert books
INSERT INTO book (title, author) VALUES
('Alice In Wonderland', 'Lewis Carroll'),
('Harry Potter', 'J.K Rowling'),
('To kill a mockingbird', 'Harper Lee');

-- Create Student table with age constraint
CREATE TABLE student (
    student_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    age INTEGER CHECK (age <= 15)
);

-- Insert students
INSERT INTO student (name, age) VALUES
('John', 12),
('Lera', 11),
('Patrick', 10),
('Bob', 14);

-- Create Library junction table
CREATE TABLE library (
    book_fk_id INTEGER REFERENCES book(book_id) ON DELETE CASCADE ON UPDATE CASCADE,
    student_fk_id INTEGER REFERENCES student(student_id) ON DELETE CASCADE ON UPDATE CASCADE,
    borrowed_date DATE,
    PRIMARY KEY (book_fk_id, student_fk_id)
);

-- Insert borrow records using subqueries
INSERT INTO library (book_fk_id, student_fk_id, borrowed_date)
VALUES
((SELECT book_id FROM book WHERE title = 'Alice In Wonderland'),
 (SELECT student_id FROM student WHERE name = 'John'),
 '2022-02-15'),

((SELECT book_id FROM book WHERE title = 'To kill a mockingbird'),
 (SELECT student_id FROM student WHERE name = 'Bob'),
 '2021-03-03'),

((SELECT book_id FROM book WHERE title = 'Alice In Wonderland'),
 (SELECT student_id FROM student WHERE name = 'Lera'),
 '2021-05-23'),

((SELECT book_id FROM book WHERE title = 'Harry Potter'),
 (SELECT student_id FROM student WHERE name = 'Bob'),
 '2021-08-12');

-- 1. Select all columns from the junction table
SELECT * FROM library;

-- 2. Select student name and borrowed book title
SELECT s.name, b.title
FROM library l
JOIN student s ON l.student_fk_id = s.student_id
JOIN book b ON l.book_fk_id = b.book_id;

-- 3. Average age of children who borrowed 'Alice In Wonderland'
SELECT AVG(s.age) AS average_age
FROM library l
JOIN student s ON l.student_fk_id = s.student_id
JOIN book b ON l.book_fk_id = b.book_id
WHERE b.title = 'Alice In Wonderland';

-- 4. Delete a student and observe what happens in the junction table
-- Example:
DELETE FROM student WHERE name = 'Lera';
-- Her borrow records will be automatically deleted from the library table due to ON DELETE CASCADE
