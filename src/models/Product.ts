import client from '../database';
import { Product } from '../types/types';
/*
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products --Skip
- [OPTIONAL] Products by category (args: product category)
#### Product
-  id
- name
- price
- [OPTIONAL] category
*/



class ProductModel {
    async index(): Promise<Product[]> {
        try {
            const conn = await client.connect();
            const query = 'SELECT * FROM products;';
            const result = await conn.query(query);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(
                `[Error] Failed to get all products from database:\n ${error} `
            );
        }
    }
    async show(id: number): Promise<Product> {
        try {
            const conn = await client.connect();
            const query = 'SELECT * FROM products WHERE product_id = $1;';
            const result = await conn.query(query, [id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `[Error] Failed to get product #${id} from database:\n ${error} `
            );
        }
    }
    async create(product: Product): Promise<Product> {
        try {
            const conn = await client.connect();
            const query =
                'INSERT INTO products (product_name, price, category) VALUES($1, $2, $3) RETURNING *;';

            const result = await conn.query(query, [
                product.product_name,
                product.price,
                product.category,
            ]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`[Error] Failed to create product:\n ${error} `);
        }
    }
    async getProductsByCategory(category: string): Promise<Product[]> {
        try {
            const conn = await client.connect();
            const query = 'SELECT * FROM products WHERE category = $1;';
            const result = await conn.query(query, [category]);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(
                `[Error] Failed to get products of ${category} from database:\n ${error} `
            );
        }
    }
}

export default ProductModel;
