
-- 🌟 Exercise 2: DVD Rental

-- 1. Use UPDATE to change the language of some films. Make sure that you use valid languages.
UPDATE film SET language_id = 2 WHERE film_id = 1;
UPDATE film SET language_id = 3 WHERE film_id = 2;

-- 2. Which foreign keys (references) are defined for the customer table? How does this affect the way in which we INSERT into the customer table?
-- Answer: The customer table references address_id, store_id. You must insert valid address and store records before inserting a customer.

-- 3. Drop customer_review table. Is this an easy step, or does it need extra checking?
DROP TABLE customer_review;

-- 4. How many rentals are still outstanding (not returned)?
SELECT COUNT(*) FROM rental WHERE return_date IS NULL;

-- 5. Find the 30 most expensive movies which are outstanding (not returned).
SELECT f.title, f.replacement_cost
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE r.return_date IS NULL
ORDER BY f.replacement_cost DESC
LIMIT 30;

-- 6. Movie 1: About a sumo wrestler and actor Penelope Monroe
SELECT f.title
FROM film f
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id
WHERE a.first_name = 'Penelope' AND a.last_name = 'Monroe'
AND (f.description ILIKE '%sumo%' OR f.title ILIKE '%sumo%');

-- 7. Movie 2: A short documentary (less than 1 hour), rated "R"
SELECT title FROM film
WHERE length < 60 AND rating = 'R';

-- 8. Movie 3: Rented by Matthew Mahan, paid over $4.00, returned between 28th July and 1st August 2005
SELECT f.title FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
JOIN customer c ON r.customer_id = c.customer_id
JOIN payment p ON r.rental_id = p.rental_id
WHERE c.first_name = 'Matthew' AND c.last_name = 'Mahan'
AND p.amount > 4.00
AND r.return_date BETWEEN '2005-07-28' AND '2005-08-01';

-- 9. Movie 4: Watched by Matthew Mahan, contains "boat" in title or description, expensive to replace
SELECT DISTINCT f.title FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
JOIN customer c ON r.customer_id = c.customer_id
WHERE c.first_name = 'Matthew' AND c.last_name = 'Mahan'
AND (f.title ILIKE '%boat%' OR f.description ILIKE '%boat%')
ORDER BY f.replacement_cost DESC;
