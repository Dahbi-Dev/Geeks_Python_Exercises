-- Exercise 3: Items and Customers

-- Part I

-- 1. Create the table purchases
CREATE TABLE purchases (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    item_id INTEGER REFERENCES items(id),
    quantity_purchased INTEGER
);

-- 2. Insert purchases for the customers using subqueries

-- Scott Scott bought one fan
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
    (SELECT id FROM customers WHERE first_name = 'Scott' AND last_name = 'Scott'),
    (SELECT id FROM items WHERE name ILIKE '%fan%'),
    1
);

-- Melanie Johnson bought ten large desks
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
    (SELECT id FROM customers WHERE first_name = 'Melanie' AND last_name = 'Johnson'),
    (SELECT id FROM items WHERE name ILIKE '%large desk%'),
    10
);

-- Greg Jones bought two small desks
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
    (SELECT id FROM customers WHERE first_name = 'Greg' AND last_name = 'Jones'),
    (SELECT id FROM items WHERE name ILIKE '%small desk%'),
    2
);

-- Part II

-- 1. All purchases
SELECT * FROM purchases;

-- 2. All purchases joined with the customers table
SELECT p.*, c.first_name, c.last_name
FROM purchases p
JOIN customers c ON p.customer_id = c.id;

-- 3. Purchases of the customer with the ID equal to 5
SELECT * FROM purchases
WHERE customer_id = 5;

-- 4. Purchases for a large desk AND a small desk
SELECT * FROM purchases
WHERE item_id IN (
    SELECT id FROM items WHERE name ILIKE '%large desk%' OR name ILIKE '%small desk%'
);

-- 5. Show all customers who have made a purchase (first name, last name, item name)
SELECT c.first_name, c.last_name, i.name AS item_name
FROM purchases p
JOIN customers c ON p.customer_id = c.id
JOIN items i ON p.item_id = i.id;

-- 6. Add a row with a valid customer_id but no item_id
-- This will work only if the item_id column allows NULLs. If not, it will fail.

-- First check the column definition:
-- If needed: ALTER TABLE purchases ALTER COLUMN item_id DROP NOT NULL;

-- Then insert:
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (1, NULL, 1);

-- Explanation:
-- This works *only if* the item_id column allows NULL values. 
-- If item_id is declared NOT NULL, it will raise an error.
-- Even if NULL is allowed, referencing a NULL item might not make sense logically in most real systems.
