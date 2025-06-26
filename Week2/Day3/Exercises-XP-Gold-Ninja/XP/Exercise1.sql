-- 🌟 Exercise 1: DVD Rental

-- 1. Get a list of all the languages, from the language table.
SELECT * FROM language;

-- 2. Get a list of all films joined with their languages – select the following details : film title, description, and language name.
SELECT film.title, film.description, language.name AS language
FROM film
JOIN language ON film.language_id = language.language_id;

-- 3. Get all languages, even if there are no films in those languages – select the following details : film title, description, and language name.
SELECT film.title, film.description, language.name AS language
FROM language
LEFT JOIN film ON film.language_id = language.language_id;

-- 4. Create a new table called new_film with the following columns : id, name. Add some new films to the table.
CREATE TABLE new_film (
    id SERIAL PRIMARY KEY,
    name TEXT
);

INSERT INTO new_film (name) VALUES
('Interstellar'),
('Inception'),
('The Matrix'),
('Avatar'),
('The Godfather');

-- 5. Create a new table called customer_review, which will contain film reviews that customers will make.
CREATE TABLE customer_review (
    review_id SERIAL PRIMARY KEY,
    film_id INTEGER REFERENCES new_film(id) ON DELETE CASCADE,
    language_id INTEGER REFERENCES language(language_id),
    title TEXT,
    score INTEGER CHECK (score BETWEEN 1 AND 10),
    review_text TEXT,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Add 2 movie reviews. Make sure you link them to valid objects in the other tables.
INSERT INTO customer_review (film_id, language_id, title, score, review_text)
VALUES
(1, 1, 'Amazing Sci-fi', 9, 'A mind-blowing experience.'),
(2, 2, 'Great Movie', 8, 'Fantastic visuals and storyline.');

-- 7. Delete a film that has a review from the new_film table, what happens to the customer_review table?
-- Example:
DELETE FROM new_film WHERE id = 1;
-- The related review in customer_review is automatically deleted due to ON DELETE CASCADE.
