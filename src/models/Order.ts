import { query } from 'express';
import client from '../database';
import Product from '../models/Product';
import { Order } from '../types/types';
import { ProductsDTO } from '../types/types';
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

class OrderModel {
    async create(user_id: number, products: ProductsDTO[]): Promise<Order[]> {
        try {
            // close previous orders on creation
            await this.completePreviousOrder(user_id);

            const conn = await client.connect();
            const defaultStatus = 'active';

            const orderQuery =
                'INSERT INTO orders (user_id, status, order_date) VALUES ($1, $2, NOW()) RETURNING order_id';
            const orderResult = await conn.query(orderQuery, [
                user_id,
                defaultStatus,
            ]);

            const order_id = orderResult.rows[0].order_id;

            const productOrderQuery =
                'INSERT INTO order_products (order_id, user_id, product_id, quantity) VALUES ($1, $2, $3, $4);';

            for (const product of products) {
                await conn.query(productOrderQuery, [
                    order_id,
                    user_id,
                    product.product_id,
                    product.quantity,
                ]);
            }
            const getOrderQuery = `
            SELECT o.order_id, u.user_id, p.product_name, op.quantity, p.price, o.status, o.order_date
                FROM (((orders AS o INNER JOIN users AS u 
                    ON o.user_id = u.user_id) 
                        INNER JOIN order_products AS op 
                            ON o.order_id = op.order_id) 
                                INNER JOIN products AS p
                                    ON op.product_id = p.product_id)
                                    WHERE u.user_id = $1 AND o.status = $2;`;
            const result = await conn.query(getOrderQuery, [
                user_id,
                defaultStatus,
            ]);
            return result.rows;
        } catch (error) {
            throw new Error(
                `[Error] Failed to create order on database:\n ${error} `
            );
        }
    }
    async show(user_id: number, order_id: number): Promise<Order> {
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
    async completePreviousOrder(user_id: number): Promise<boolean> {
        try {
            const conn = await client.connect();
            const query =
                "UPDATE orders SET status = 'completed' WHERE user_id = $1";
            await conn.query(query, [user_id]);
            conn.release();
            return true;
        } catch (error) {
            throw new Error(
                `[Error] Failed to complete previous orders on database:\n ${error} `
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
