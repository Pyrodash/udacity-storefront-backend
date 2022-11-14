CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    
    CONSTRAINT fk_order
        FOREIGN KEY(order_id)
            REFERENCES orders(id),
    
    CONSTRAINT fk_product
        FOREIGN KEY(product_id)
            REFERENCES products(id)
);