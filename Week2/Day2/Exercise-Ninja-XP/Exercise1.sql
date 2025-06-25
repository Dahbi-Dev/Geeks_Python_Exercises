-- Exercise 1: Bonus Public Database (Continuation of XP)

-- 1. Fetch the last 2 customers in alphabetical order (A-Z) – exclude ‘id’ from the results.
SELECT first_name, last_name
FROM customers
ORDER BY first_name ASC, last_name ASC
LIMIT 2 OFFSET (
    SELECT COUNT(*) - 2 FROM customers
);

-- Alternative simpler version using ORDER BY DESC then reversing:
SELECT first_name, last_name
FROM customers
ORDER BY first_name DESC, last_name DESC
LIMIT 2;

-- 2. Delete all purchases made by Scott.
DELETE FROM purchases
WHERE customer_id = (
    SELECT id FROM customers
    WHERE first_name = 'Scott' AND last_name = 'Scott'
);

-- 3. Does Scott still exist in the customers table?
SELECT * FROM customers
WHERE first_name = 'Scott' AND last_name = 'Scott';

-- Explanation:
-- If the customer still exists, this query will return their data.
-- Only the purchases were deleted.

-- 4. Find all purchases, join with customers,
-- so Scott’s order will appear, but customer name will be blank (use LEFT JOIN).
SELECT p.id AS purchase_id, c.first_name, c.last_name, p.quantity_purchased
FROM purchases p
LEFT JOIN customers c ON p.customer_id = c.id;

-- Explanation:
-- LEFT JOIN includes all rows from purchases, and customer info if it exists.
-- If a customer was deleted (like Scott), his name will be NULL (blank).

-- 5. Find all purchases, join with customers,
-- so Scott’s order will NOT appear (use INNER JOIN).
SELECT p.id AS purchase_id, c.first_name, c.last_name, p.quantity_purchased
FROM purchases p
INNER JOIN customers c ON p.customer_id = c.id;

-- Explanation:
-- INNER JOIN only includes purchases with existing customers.
-- If Scott was deleted from customers, his purchases won’t appear.
