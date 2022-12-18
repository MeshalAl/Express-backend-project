CREATE TABLE IF NOT EXISTS order_products ( 
    order_product_id SERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL, 
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL, 
    FOREIGN KEY (product_id) REFERENCES products(product_id), 
    FOREIGN KEY (order_id) REFERENCES orders(order_id));