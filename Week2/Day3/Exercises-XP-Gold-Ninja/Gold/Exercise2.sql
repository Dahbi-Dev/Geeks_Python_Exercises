-- Exercise 2 – Happy Halloween
-- Instructions
-- There is a zombie plague approaching! The DVD rental company is offering to lend all of its DVDs to the local shelters, so that the citizens can watch the movies together in the shelters until the zombies are destroyed by the armed forces. Prepare tables with the following data:

-- 1-How many stores there are, and in which city and country they are located
select s.store_id, s.manager_staff_id, a.address, a.address2, a.district, ci.city, co.country
from store s
join address a on s.address_id = a.address_id
join city ci on a.city_id = ci.city_id
join country co on ci.country_id = co.country_id;

--2- How many hours of viewing time there are in total in each store – in other words, the sum of the length of every inventory item in each store.
select s.store_id, co.country, ci.city, sum(f.length) as total_length_minutes,
       sum(f.length) / 60 as total_length_hours,
       sum(f.length) / 1440 as total_length_days
from store s
join inventory i on s.store_id = i.store_id
join film f on i.film_id = f.film_id
join address a on s.address_id = a.address_id
join city ci on a.city_id = ci.city_id
join country co on ci.country_id = co.country_id
group by s.store_id, co.country, ci.city;


--3- Make sure to exclude any inventory items which are not yet returned. (Yes, even in the time of zombies there are people who do not return their DVDs)
-- Corrected
select s.store_id, co.country, ci.city, sum(f.length) as total_length_minutes,
       sum(f.length) / 60 as total_length_hours,
       sum(f.length) / 1440 as total_length_days
from store s
join inventory i on s.store_id = i.store_id
join film f on i.film_id = f.film_id
join rental r on i.inventory_id = r.inventory_id
join address a on s.address_id = a.address_id
join city ci on a.city_id = ci.city_id
join country co on ci.country_id = co.country_id
where r.return_date is NOT null
group by s.store_id, co.country, ci.city;


--4-  A list of all customers in the cities where the stores are located.
select distinct c.customer_id, c.first_name, c.last_name, ci.city, co.country
from customer c
join address a on c.address_id = a.address_id
join city ci on a.city_id = ci.city_id
join country co on ci.country_id = co.country_id
where ci.city_id in (
    select ci.city_id
    from store s
    join address a on s.address_id = a.address_id
    join city ci on a.city_id = ci.city_id
);

--5- A list of all customers in the countries where the stores are located.
select distinct c.customer_id, c.first_name, c.last_name, co.country
from customer c
join address a on c.address_id = a.address_id
join city ci on a.city_id = ci.city_id  
join country co on ci.country_id = co.country_id
join store s on a.address_id = s.address_id
where co.country in (select co.country from store s
                     join address a on s.address_id = a.address_id
                     join city ci on a.city_id = ci.city_id
                     join country co on ci.country_id = co.country_id);


--6 Some people will be frightened by watching scary movies while zombies walk the streets.
-- Create a ‘safe list’ of all movies which do not include the ‘Horror’ category,
--  or contain the words ‘beast’, ‘monster’, ‘ghost’, ‘dead’, ‘zombie’, or ‘undead’ in their titles or descriptions… 
-- Get the sum of their viewing time (length).
-- Hint : use the CHECK contraint
select f.film_id, f.title, f.description, f.length, 
       sum(f.length) as total_length_minutes,
       sum(f.length) / 60 as total_length_hours,
       sum(f.length) / 1440 as total_length_days
from film f
join film_category fc on f.film_id = fc.film_id
join category c on fc.category_id = c.category_id
where c.name != 'Horror' 
  and lower(f.title) not like any (array['%beast%', '%monster%', '%ghost%', '%dead%', '%zombie%', '%undead%'])
  and lower(f.description) not like any (array['%beast%', '%monster%', '%ghost%', '%dead%', '%zombie%', '%undead%'])
group by f.film_id, f.title, f.description, f.length;

-- 7- For both the ‘general’ and the ‘safe’ lists above, also calculate the time in hours and days (not just minutes).
select f.film_id, f.title, f.description, f.length, 
       sum(f.length) as total_length_minutes,
       sum(f.length) / 60 as total_length_hours,
       sum(f.length) / 1440 as total_length_days
from film f
join film_category fc on f.film_id = fc.film_id
join category c on fc.category_id = c.category_id
where c.name != 'Horror' 
  and (f.title not like '%beast%' 
       and f.title not like '%monster%' 
       and f.title not like '%ghost%' 
       and f.title not like '%dead%' 
       and f.title not like '%zombie%' 
       and f.title not like '%undead%'
       and f.description not like '%beast%' 
       and f.description not like '%monster%' 
       and f.description not like '%ghost%' 
       and f.description not like '%dead%' 
       and f.description not like '%zombie%' 
       and f.description not like '%undead%')
group by f.film_id, f.title, f.description, f.length;
