-- Question 1: Create a table called product_orders and a table called items. 
-- You decide which fields should be in each table, although make sure the items table has a column called price.
-- There should be a one to many relationship between the product_orders table and the items table. 
-- An order can have many items, but an item can belong to only one order.

CREATE TABLE product_orders (
    id SERIAL PRIMARY KEY,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price NUMERIC(10,2) NOT NULL,
    order_id INTEGER REFERENCES product_orders(id)
);

-- Question 2: Create a function that returns the total price for a given order.

CREATE OR REPLACE FUNCTION get_order_total(order_id INT)
RETURNS NUMERIC AS $$
DECLARE
    total NUMERIC;
BEGIN
    SELECT SUM(price) INTO total
    FROM items
    WHERE order_id = get_order_total.order_id;

    RETURN COALESCE(total, 0);
END;
$$ LANGUAGE plpgsql;

-- Bonus: Create a table called users.
-- There should be a one to many relationship between the users table and the product_orders table.

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

ALTER TABLE product_orders
ADD COLUMN user_id INTEGER REFERENCES users(id);

-- Bonus: Create a function that returns the total price for a given order of a given user.

CREATE OR REPLACE FUNCTION get_user_order_total(user_id INT, order_id INT)
RETURNS NUMERIC AS $$
DECLARE
    total NUMERIC;
BEGIN
    SELECT SUM(i.price) INTO total
    FROM items i
    JOIN product_orders po ON i.order_id = po.id
    WHERE po.user_id = get_user_order_total.user_id
      AND po.id = get_user_order_total.order_id;

    RETURN COALESCE(total, 0);
END;
$$ LANGUAGE plpgsql;
