CREATE TABLE IF NOT EXISTS products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL, 
    price FLOAT NOT NULL, 
    category VARCHAR(100) 
);