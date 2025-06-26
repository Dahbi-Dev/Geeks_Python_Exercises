-- Exercise 1 : DVD Rentals
-- Instructions
-- 1- Get a list of all rentals which are out (have not been returned). How do we identify these films in the database?
select r.rental_id, r.rental_date, r.return_date, f.title, c.first_name, c.last_name
from rental r
join inventory i on r.inventory_id = i.inventory_id
join film f on i.film_id = f.film_id
join customer c on r.customer_id = c.customer_id
where r.return_date is null;


--2-  Get a list of all customers who have not returned their rentals. Make sure to group your results.
select c.customer_id, c.first_name, c.last_name, count(r.rental_id) as total_rentals
from customer c 
join rental r on c.customer_id = r.customer_id
where r.return_date is null
group by c.customer_id, c.first_name, c.last_name
order by total_rentals desc;

--3 Get a list of all the Action films with Joe Swank.
-- Before you start, could there be a shortcut to getting this information? Maybe a view?
select f.title,f.description, a.first_name, a.last_name
from film f
join film_category fc on f.film_id = fc.film_id
join category c on fc.category_id = c.category_id
join film_actor fa on f.film_id = fa.film_id
join actor a on fa.actor_id = a.actor_id
where c.name = 'Action' and a.first_name = 'Joe' and a.last_name = 'Swank';

