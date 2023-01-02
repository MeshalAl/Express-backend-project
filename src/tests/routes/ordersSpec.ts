import { response } from 'express';
import supertest from 'supertest';
import app from '../..';
import UserModel from '../../models/User';
import { Order, Product } from '../../types/types';
import { User } from '../../types/types';

const request = supertest(app);
const ordersRoute = '/api/orders/';
const productsRoute = '/api/products';

const usermodel = new UserModel();

let testToken: string;
let testOrderProduct_1: Order;
let testOrderProduct_2: Order;

describe('Orders endpoints:', () => {
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

        const result = await usermodel.create(testUser);
        testUser.user_id = result.user_id;

        const tokenResponse = await request
            .post('/api/users/auth')
            .set('Content-type', 'application/json')
            .send({
                user_id: testUser.user_id,
                password: testUser.password,
            });
        testToken = tokenResponse.body;

        for (const product of testProducts) {
            const productResponse = await request
                .post(productsRoute)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${testToken}`)
                .send(product);
            product.product_id = productResponse.body.product_id;
        }
    });

    it('Create order successful', async () => {
        const Products = [
            {
                product_id: testProducts[0].product_id,
                quantity: testProducts[0].quantity,
            },
            {
                product_id: testProducts[1].product_id,
                quantity: testProducts[1].quantity,
            },
        ];
        const response = await request
            .post(ordersRoute)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${testToken}`)
            .send({ Products });

        const order = response.body;

        expect(order[0].product_name).toBe(testProducts[0].product_name);
        expect(order[0].quantity).toBe(testProducts[0].quantity);
        expect(order[0].price).toBe(testProducts[0].price);

        expect(order[0].order_id).toBeDefined();
        expect(order[0].user_id).toBeDefined();
        expect(order[0].status).toBeDefined();
        expect(order[0].order_date).toBeDefined();

        expect(order[1].product_name).toBe(testProducts[1].product_name);
        expect(order[1].quantity).toBe(testProducts[1].quantity);
        expect(order[1].price).toBe(testProducts[1].price);

        expect(order[1].order_id).toBeDefined();
        expect(order[1].user_id).toBeDefined();
        expect(order[1].status).toBeDefined();
        expect(order[1].order_date).toBeDefined();

        testOrderProduct_1 = order[0];
        testOrderProduct_2 = order[1];
        console.log(order);
    });
    it('get order by id successful', async () => {
        const response = await request
            .get(ordersRoute + `/${testOrderProduct_1.order_id}`)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${testToken}`);

        const order = response.body;

        expect(order[0].order_id).toBe(testOrderProduct_1.order_id);
        expect(order[0].user_id).toBe(testOrderProduct_1.user_id);
        expect(order[0].status).toBe(testOrderProduct_1.status);
        expect(order[0].order_date).toBe(testOrderProduct_1.order_date);

        expect(order[0].product_name).toBe(testOrderProduct_1.product_name);
        expect(order[0].quantity).toBe(testOrderProduct_1.quantity);
        expect(order[0].price).toBe(testOrderProduct_1.price);

        expect(order[1].order_id).toBe(testOrderProduct_2.order_id);
        expect(order[1].user_id).toBe(testOrderProduct_2.user_id);
        expect(order[1].status).toBe(testOrderProduct_2.status);
        expect(order[1].order_date).toBe(testOrderProduct_2.order_date);

        expect(order[1].product_name).toBe(testOrderProduct_2.product_name);
        expect(order[1].quantity).toBe(testOrderProduct_2.quantity);
        expect(order[1].price).toBe(testOrderProduct_2.price);
    });
    // it('get order by id successful', async () => {

    // });
});
