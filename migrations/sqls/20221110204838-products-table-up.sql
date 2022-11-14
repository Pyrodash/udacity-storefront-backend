CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    category_id INT NOT NULL
);