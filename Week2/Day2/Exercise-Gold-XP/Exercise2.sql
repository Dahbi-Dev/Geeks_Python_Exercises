-- Exercise 2: students table

-- 1. Update
-- ‘Lea Benichou’ and ‘Marc Benichou’ are twins, they should have the same birth_dates. Update both their birth_dates to 02/11/1998.
UPDATE students
SET birth_date = '1998-11-02'
WHERE (first_name = 'Lea' AND last_name = 'Benichou')
   OR (first_name = 'Marc' AND last_name = 'Benichou');

-- 2. Change the last_name of David from ‘Grez’ to ‘Guez’.
UPDATE students
SET last_name = 'Guez'
WHERE first_name = 'David' AND last_name = 'Grez';

-- 3. Delete the student named ‘Lea Benichou’ from the table.
DELETE FROM students
WHERE first_name = 'Lea' AND last_name = 'Benichou';

-- 4. Count how many students are in the table.
SELECT COUNT(*) AS total_students FROM students;

-- 5. Count how many students were born after 1/01/2000.
SELECT COUNT(*) AS born_after_2000
FROM students
WHERE birth_date > '2000-01-01';

-- 6. Add a column to the student table called math_grade.
ALTER TABLE students
ADD COLUMN math_grade INTEGER;

-- 7. Add 80 to the student which id is 1.
UPDATE students
SET math_grade = 80
WHERE id = 1;

-- 8. Add 90 to the students which have ids of 2 or 4.
UPDATE students
SET math_grade = 90
WHERE id IN (2, 4);

-- 9. Add 40 to the student which id is 6.
UPDATE students
SET math_grade = 40
WHERE id = 6;

-- 10. Count how many students have a grade bigger than 83
SELECT COUNT(*) AS students_above_83
FROM students
WHERE math_grade > 83;

-- 11. Add another student named ‘Omer Simpson’ with the same birth_date as the one already in the table. Give him a grade of 70.
-- First, get the birth_date of the existing Omer Simpson
INSERT INTO students (first_name, last_name, birth_date, math_grade)
VALUES (
    'Omer',
    'Simpson',
    (SELECT birth_date FROM students WHERE first_name = 'Omer' AND last_name = 'Simpson' LIMIT 1),
    70
);

-- 12. Now, in the table, ‘Omer Simpson’ should appear twice. It’s the same student, although he received 2 different grades because he retook the math exam.
-- (No query needed, just confirmation)

-- Bonus:
-- 13. Count how many grades each student has.
-- Display first_name, last_name, and total_grade (number of grades).
SELECT first_name, last_name, COUNT(math_grade) AS total_grade
FROM students
GROUP BY first_name, last_name
ORDER BY first_name, last_name;

-- 14. Find the sum of all the students grades.
SELECT SUM(math_grade) AS total_grades_sum
FROM students;
