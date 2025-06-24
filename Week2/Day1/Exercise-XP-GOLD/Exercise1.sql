--1- create bootcamp database
create database "bootcamp"

--2- Create a table called students.
create table students(
id SERIAL PRIMARY KEY ,
last_name TEXT ,
first_name TEXT ,
birth_date DATE
);

INSERT INTO students (first_name, last_name, birth_date)
VALUES
('Marc', 'Benichou', '1998-11-02'),
('Yoan', 'Cohen', '2010-12-03'),
('Lea', 'Benichou', '1987-07-27'),
('Amelia', 'Dux', '1996-04-07'),
('David', 'Grez', '2003-06-14'),
('Omer', 'Simpson', '1980-10-03');



-- 4 Insert your last_name, first_name and birth_date to the students table (Take a look at the id given).
INSERT INTO students (first_name, last_name, birth_date)
VALUES ('Houssam', 'Dahbi', '2001-01-02');
-- it give me the last id


-- Fetch all of the data from the table.
select * from students





-----------Students table #2-------------
--1- Fetch the first four students. You have to order the four students alphabetically by last_name.
select first_name, last_name from students order by last_name ASC limit 4;

--2 -Fetch the details of the youngest student.
select first_name, last_name, birth_date from students order by birth_date DESC  limit 1 ;

--3- Fetch three students skipping the first two students.
select first_name, last_name, birth_date from students offset 2;


