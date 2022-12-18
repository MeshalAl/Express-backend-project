CREATE TABLE IF NOT EXISTS cart ( 
    cart_id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL, 
    order_id BIGINT,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    status VARCHAR(100),
    FOREIGN KEY (product_id) REFERENCES products(product_id), 
    FOREIGN KEY (user_id) REFERENCES users(id));