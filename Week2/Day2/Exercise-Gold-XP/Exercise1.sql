-- Exercise-1-Gold-XP-DVD-Rental -----------

--1. You were hired to babysit your cousin and you want to find a few movies that he can watch with you.
	--1. Find out how many films there are for each rating.
select  rating, count(*) as film_count
from film
group by rating
	
--2. Get a list of all the movies that have a rating of G or PG-13.
	--1. Filter this list further: look for only movies that are under 2 hours long, 
	-- and whose rental price (rental_rate) is under 3.00. Sort the list alphabetically.
SELECT title, rating, length, rental_rate
FROM film
WHERE (rating = 'G' OR rating = 'PG-13')
  AND length < 120
  AND rental_rate < 3.00
ORDER BY title ASC;
	
--3. Find a customer in the customer table, and change his/her details to your details, using SQL UPDATE.
	update customer
	set first_name = 'Houssam' ,
	last_name = 'Dahbi', 
	email = 'dahbi.houssam@geeks.com',
	where customer_id = 524
--4. Now find the customer’s address, and use UPDATE to change the address to your address (or make one up).
	-- find customer address
	SELECT a.*
	FROM customer c
	JOIN address a ON c.address_id = a.address_id
	WHERE c.customer_id = 524;

	
	--update address
	UPDATE address
	SET address = 'Bouskoura'
	WHERE address_id = (
    SELECT address_id FROM customer WHERE customer_id = 524
);


	