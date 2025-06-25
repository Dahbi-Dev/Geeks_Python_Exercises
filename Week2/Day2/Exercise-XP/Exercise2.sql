-- 1. Select all columns from the “customer” table:
SELECT * FROM customer;

-- 2. Display names using an alias named “full_name”:
select first_name || ' ' || last_name as full_name from customer;

--3.  Get all unique create dates from the “customer” table:
select distinct create_date from customer;

--4.  Get all customer details, ordered by first name descending:
select * from customer
order by first_name desc;

--5.  Film details ordered by rental rate ascending:
select * from film 
order by rental_rate asc

--6.  Address and phone number of customers in Texas (from address table):
select address, phone from address
where district ILIKE 'Texas%';
--or this method basic one 
select address, phone from address
where district = 'Texas';

--7. Movies with film ID = 15 or 150:
select * from film
where film_id = 15 or film_id = 150;
--or
select * from film
where film_id in(15,150);

--8. Check if your favorite movie exists (replace 'Your Movie'):
select  film_id, title, description, length ,rental_rate from film
where title = 'your favorite movie'

--9. Search movies starting with same two letters (e.g., 'In'):
select  film_id, title, description, length ,rental_rate from film
where title ilike 'In%'

--10. Get the 10 cheapest movies:
select * from film 
order by rental_rate asc
limit 10

--11. Get the next 10 cheapest movies (without using LIMIT):
WITH ranked_films AS (
  SELECT *, ROW_NUMBER() OVER (ORDER BY rental_rate ASC) AS rn
  FROM film
)
SELECT * FROM ranked_films
WHERE rn > 10 AND rn <= 20;

--12. Join customer and payment, get name, amount, date:
SELECT c.first_name, c.last_name, p.amount, p.payment_date
FROM customer c
JOIN payment p ON c.customer_id = p.customer_id
ORDER BY c.customer_id;

--13.  Get all movies not in inventory:
SELECT *
FROM film
WHERE film_id NOT IN (SELECT DISTINCT film_id FROM inventory);

--14. Write a query to find which city is in which country.
SELECT ci.city, co.country
FROM city ci
JOIN country co ON ci.country_id = co.country_id;


--15. Bonus: Get customer id, names, payment amount and date, ordered by staff id:
SELECT c.customer_id, c.first_name, c.last_name, p.amount, p.payment_date, p.staff_id
FROM customer c
JOIN payment p ON c.customer_id = p.customer_id
ORDER BY p.staff_id, c.customer_id;
