-- Exercise 1 : DVD Rentals
-- Instructions
-- We want to encourage families and kids to enjoy our movies.

-- 1- Retrieve all films with a rating of G or PG, which are are not currently rented (they have been returned/have never been borrowed).
SELECT DISTINCT f.film_id, f.title, f.description, f.release_year, f.language_id, f.rental_duration, 
       f.rental_rate, f.length, f.replacement_cost, f.rating, f.special_features
FROM film f
JOIN inventory i ON f.film_id = i.film_id
LEFT JOIN rental r ON i.inventory_id = r.inventory_id AND r.return_date IS NULL
WHERE f.rating IN ('G', 'PG')
  AND r.rental_id IS NULL -- meaning not currently rented
ORDER BY f.film_id;


-- 2- Create a new table which will represent a waiting list for children’s movies. 
-- This will allow a child to add their name to the list until the DVD is available (has been returned). 
-- Once the child takes the DVD, their name should be removed from the waiting list (ideally using triggers, 
-- but we have not learned about them yet. Let’s assume that our Python program will manage this). Which table references should be included?
CREATE TABLE waiting_list (
    waiting_list_id SERIAL PRIMARY KEY,
    film_id INT NOT NULL,
    customer_id INT NOT NULL,
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (film_id) REFERENCES film(film_id),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);



-- 3- Retrieve the number of people waiting for each children’s DVD. Test this by adding rows to the table that you created in question 2 above.
SELECT w.film_id, f.title, COUNT(w.customer_id) AS waiting_count
FROM waiting_list w
JOIN film f ON w.film_id = f.film_id
WHERE f.rating IN ('G', 'PG')
GROUP BY w.film_id, f.title
ORDER BY waiting_count DESC;
