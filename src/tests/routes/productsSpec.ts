import supertest from 'supertest';
import app from '../..';
import UserModel from '../../models/User';
import { Product } from '../../types/types';
import { User } from '../../types/types';

const request = supertest(app);
const usermodel = new UserModel();

const productsRoute = '/api/products';
let testToken: string;

describe('Products endpoints:', () => {
    const testProduct: Product = {
        product_name: 'test Product 001',
        price: 299.95,
        category: 'test category',
    };
    beforeAll(async () => {
        const testUser: User = {
            firstname: '_testUser',
            lastname: 'testUser_',
            password: 'abc123',
        };
        const result = await usermodel.create(testUser);
        testUser.user_id = result.user_id;

        const response = await request
            .post('/api/users/auth')
            .set('Content-type', 'application/json')
            .send({
                user_id: testUser.user_id,
                password: testUser.password,
            });
        testToken = response.body;
    });
    it('Create a product successful', async () => {
        const response = await request
            .post(productsRoute)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${testToken}`)
            .send(testProduct);

        const { product_id, product_name, price, category } = response.body;

        expect(response.status).toBe(200);
        expect(product_name).toBe(testProduct.product_name);
        expect(price).toBe(testProduct.price);
        expect(category).toBe(testProduct.category);

        testProduct.product_id = product_id;
    });
    it('get a product successful', async () => {
        const response = await request
            .get(productsRoute + `/${testProduct.product_id}`)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${testToken}`);

        const { product_id, product_name, price, category } = response.body;

        expect(response.status).toBe(200);
        expect(product_id).toBe(testProduct.product_id);
        expect(product_name).toBe(testProduct.product_name);
        expect(price).toBe(testProduct.price);
        expect(category).toBe(testProduct.category);
    });
    it('get all products successful', async () => {
        const testProduct_2: Product = {
            product_name: 'test Product 002',
            price: 19.5,
            category: 'test category 2',
        };

        const product_result = await request
            .post(productsRoute)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${testToken}`)
            .send(testProduct_2);

        testProduct_2.product_id = product_result.body.product_id;

        const response = await request
            .get(productsRoute)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${testToken}`);

        const list = response.body;

        expect(response.status).toBe(200);
        expect(list).toContain(testProduct);
        expect(list).toContain(testProduct_2);
    });
});
