CREATE TABLE IF NOT EXISTS orders (
    order_id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    status VARCHAR(100),
    order_date TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);