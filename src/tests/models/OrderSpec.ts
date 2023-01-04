import OrderModel from '../../models/Order';
import UserModel from '../../models/User';
import ProductModel from '../../models/Product';

import { Order, Product, User } from '../../types/types';
import exp from 'constants';

const order = new OrderModel();
const user = new UserModel();
const product = new ProductModel();

let user_id: number;
let order_id: number;

describe('Order model tests:', () => {
    const testProducts: Product[] = [
        {
            product_name: 'test Product 001',
            price: 299.95,
            category: 'test category 001',
            quantity: 5,
        },
        {
            product_name: 'test Product 002',
            price: 19.52,
            category: 'test category 002',
            quantity: 3,
        },
    ];
    beforeAll(async () => {
        const testUser: User = {
            firstname: '_testUser',
            lastname: 'testUser_',
            password: 'abc123',
        };

        const result = await user.create(testUser);
        user_id = Number(result.user_id);

        for (const p of testProducts) {
            const result = await product.create(p);
            p.product_id = result.product_id;
        }
    });
    it('Create and get order on model successful', async () => {
        const result = await order.create(user_id, testProducts);

        expect(result[0].product_name).toBe(testProducts[0].product_name);
        expect(result[0].price).toBe(testProducts[0].price);
        expect(result[0].quantity).toBe(testProducts[0].quantity);

        expect(result[0].order_id).toBeDefined();
        expect(result[0].user_id).toBe(user_id);
        expect(result[0].status).toBeDefined();
        expect(result[0].order_date).toBeDefined();

        expect(result[1].product_name).toBe(testProducts[1].product_name);
        expect(result[1].quantity).toBe(testProducts[1].quantity);
        expect(result[1].price).toBe(testProducts[1].price);

        expect(result[1].order_id).toBeDefined();
        expect(result[1].user_id).toBe(user_id);
        expect(result[1].status).toBeDefined();
        expect(result[1].order_date).toBeDefined();

        order_id = result[0].order_id;
    });

    it('get order by ID on model successful', async () => {
        const result = await order.show(user_id, order_id);

        expect(result[0].order_id).toBe(order_id);
        expect(result[0].user_id).toBe(user_id);

        expect(result[1].order_id).toBe(order_id);
        expect(result[1].user_id).toBe(user_id);
    });
    it('get all orders on model successful', async () => {
        const testProducts2: Product[] = [
            {
                product_name: 'test Product 003',
                price: 2114.95,
                category: 'test category 003',
                quantity: 2,
            },
            {
                product_name: 'test Product 004',
                price: 12.42,
                category: 'test category 004',
                quantity: 1,
            },
        ];
        for (const p of testProducts2) {
            const result = await product.create(p);
            p.product_id = result.product_id;
        }

        const createResult = await order.create(user_id, testProducts2);

        const order_id_2 = createResult[3].order_id;

        const result = await order.showAll(user_id);

        expect(result[1].order_id).toBe(order_id);
        expect(result[0].order_id).toBe(order_id_2);
    });
});
