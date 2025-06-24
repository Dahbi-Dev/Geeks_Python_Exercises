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

--Fetch all of the students first_names and last_names.
select first_name , last_name from students

--For the following questions, only fetch the first_names and last_names of the students.
-- 1- Fetch the student which id is equal to 2.
select first_name, last_name from students where id = 2 ;

-- 2- Fetch the student whose last_name is Benichou AND first_name is Marc.
select first_name, last_name from students 
where last_name = 'Benichou' and first_name = 'Marc';

-- 3-Fetch the students whose last_names are Benichou OR first_names are Marc.
select first_name, last_name from students 
where last_name = 'Benichou' or first_name = 'Marc';

-- 4-Fetch the students whose first_names contain the letter a.
select first_name, last_name from students 
where first_name ilike '%a%'

-- 5-Fetch the students whose first_names start with the letter a.
select first_name, last_name from students 
where first_name ilike 'a%'

-- 6-Fetch the students whose first_names end with the letter a.
select first_name, last_name from students 
where first_name ilike '%a'

-- 7-Fetch the students whose second to last letter of their first_names are a (Example: Leah).
select first_name, last_name from students 
WHERE first_name LIKE '%a_';

-- 8-Fetch the students whose id’s are equal to 1 AND 3 .
select first_name, last_name from students 
where id in(1,3);

--4- Fetch the students whose birth_dates are equal to or come after 1/01/2000. (show all their info).
select first_name, last_name, birth_date from students 
where birth_date >= '2000-01-01'




-----------Students table #2-------------
--1- Fetch the first four students. You have to order the four students alphabetically by last_name.
select first_name, last_name from students order by last_name ASC limit 4;

--2 -Fetch the details of the youngest student.
select first_name, last_name, birth_date from students order by birth_date DESC  limit 1 ;

--3- Fetch three students skipping the first two students.
select first_name, last_name, birth_date from students offset 2;


