CREATE TABLE IF NOT EXISTS products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL, 
    price VARCHAR(100) NOT NULL, 
    category VARCHAR(100) 
);