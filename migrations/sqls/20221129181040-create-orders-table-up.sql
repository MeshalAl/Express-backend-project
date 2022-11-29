CREATE TABLE IF NOT EXISTS orders (
    order_id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id), 
    status VARCHAR(100)
)