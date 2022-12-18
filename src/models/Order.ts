import client from '../database';
import Product from '../models/Product';
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
*/

export type Order = {
    order_id: string;
    user_id: string;
    status: string;
};

class OrderModel {
    async create(user_id: string): Promise<Order> {
        try {
            const conn = await client.connect();
            const query =
                'INSERT INTO orders (user_id, status) VALUES ($1, "active");';
            const result = await conn.query(query, [user_id]);

            return result.rows[0];
        } catch (error) {
            throw new Error(
                `[Error] Failed to create order on database:\n ${error} `
            );
        }
    }
    async show(user_id: string, order_id: string): Promise<Order> {
        try {
            const conn = await client.connect();
            const query =
                'SELECT * FROM orders WHERE user_id = $1 AND order_id = $2;';
            const result = await conn.query(query, [user_id, order_id]);

            return result.rows[0];
        } catch (error) {
            throw new Error(
                `[Error] Failed to create order on database:\n ${error} `
            );
        }
    }

    // async addCartToOrder(
    //     product_id: string,
    //     quantity: number,
    //     user_id: string
    // ): Promise<Order> {
    //     try {
    //         const conn = await client.connect();
    //         const productQuery =
    //             'SELECT * FROM products WHERE product_id = $1;';
    //         const product = conn.query(productQuery, [product_id]);

    //         const OrderQuery = 'INSERT INTO order_products';
    //         conn.release();

    //         return null;
    //     } catch (error) {
    //         throw new Error(
    //             `[Error] Failed to add to order on database:\n ${error} `
    //         );
    //     }
    // }
}

export default OrderModel;
