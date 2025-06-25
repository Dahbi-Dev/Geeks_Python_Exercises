-- Daily SQL Challenge – Puzzle Solution

-- Table Creation and Inserts
CREATE TABLE FirstTab (
    id INTEGER,
    name VARCHAR(10)
);

INSERT INTO FirstTab VALUES
(5,'Pawan'),
(6,'Sharlee'),
(7,'Krish'),
(NULL,'Avtaar');

CREATE TABLE SecondTab (
    id INTEGER
);

INSERT INTO SecondTab VALUES
(5),
(NULL);

-- Data Snapshot:
-- FirstTab:
-- id | name
--  5 | Pawan
--  6 | Sharlee
--  7 | Krish
--  NULL | Avtaar

-- SecondTab:
-- id
-- 5
-- NULL

-- Question 1:
-- SELECT COUNT(*) FROM FirstTab AS ft WHERE ft.id NOT IN ( SELECT id FROM SecondTab WHERE id IS NULL );
-- Prediction: 0

-- Question 2:
-- SELECT COUNT(*) FROM FirstTab AS ft WHERE ft.id NOT IN ( SELECT id FROM SecondTab WHERE id = 5 );
-- Prediction: 2

-- Question 3:
-- SELECT COUNT(*) FROM FirstTab AS ft WHERE ft.id NOT IN ( SELECT id FROM SecondTab );
-- Prediction: 0

-- Question 4:
-- SELECT COUNT(*) FROM FirstTab AS ft WHERE ft.id NOT IN ( SELECT id FROM SecondTab WHERE id IS NOT NULL );
-- Prediction: 2
