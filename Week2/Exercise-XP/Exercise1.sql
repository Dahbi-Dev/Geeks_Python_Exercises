-- creating database
create database "public";

------------------ items --------------
-- creating items table
CREATE TABLE items(
	id SERIAL PRIMARY KEY,
	name TEXT,
	price NUMERIC(6,2)
);

-- Add the data to items table
insert into items (name, price)
values 
('Small Desk', 100 ),
('Large desk', 300 ),
('Fan ', 80 )


-- show all items
select * from items

-- show price items above 80 not include the 80
select price from items where price > 80 ;

--All the items with a price below 300. (300 included)
select price from items where price <= 300;




----------------------- customers -----------------------------------------
-- creating customers table
CREATE TABLE customers(
	id SERIAL PRIMARY KEY,
	name TEXT,
	last_name TEXT
);


--  5 new customers to the customers table
insert into customers (name, last_name)
values 
('Greg', 'Jones'),
('Sandra', 'Jones'),
('Scott', 'Scott'),
('Trevor', 'Green'),
('Melanie', 'Johnson')


--All customers whose last name is ‘Smith’ (What will be your outcome?).
select last_name from customers where last_name = 'Smith';
-- outcome :  No rows returned (0 results)

--All customers whose last name is ‘Jones’.
select last_name from customers where last_name = 'Jones';

--All customers whose firstname is not ‘Scott’.
select name from customers where name != 'Scott';




 
