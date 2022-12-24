import client from '../database';
import { Product } from '../types/types';

/*
#### Orders route
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]
#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

order_products scheme
    order_id BIGINT NOT NULL, 
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL, 
    FOREIGN KEY (product_id) REFERENCES products(product_id), 
    FOREIGN KEY (order_id) REFERENCES orders(order_id));
*/

export type Cart = {
    user_id: number;
    order_id?: string;
    product_id: string;
    product_name?: string;
    quantity: number;
    price?: number;
    status: string;
};

class CartModel {
    async add(
        user_id: number,
        product_id: number,
        quantity: number
    ): Promise<void> {
        try {
            const conn = await client.connect();
            const query =
                'INSERT INTO cart (user_id, product_id, quantity, status) VALUES ($1, $2, $3, $4) RETURNING *;';
            conn.query(query, [user_id, product_id, quantity, 'current']);
            conn.release();
            return;
        } catch (error) {
            throw new Error(`[Error] Failed to create user:\n ${error}`);
        }
    }

    async currentCart(user_id: number): Promise<Cart[]> {
        try {
            const conn = await client.connect();
            const query = 'SELECT * from cart where user_id = $1;';
            const result = await conn.query(query, [user_id]);
            return result.rows;
        } catch (error) {
            throw new Error(`[Error] Failed to get current cart:\n ${error}`)
        }
    }

    async cartToOrder(order_id: number, user_id: number): Promise<Cart[]> {
        try {
            const conn = await client.connect();
            const query =
                "UPDATE cart SET order_id = $1 WHERE user_id = $2 AND status = 'current' RETURNING *";
            const result = await conn.query(query, [order_id, user_id]);
            conn.release();

            return result.rows;
        } catch (error) {
            throw new Error(
                `[Error] Failed to convert cart to order:\n ${error} `
            );
        }
    }
}
export default CartModel;
