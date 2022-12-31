import supertest from 'supertest';
import app from '../..';

const request = supertest(app);
const ordersRoute = '/api/orders/';

xdescribe('order controller tests:', () => {
    it('Expect order creation sucessful', async () => {
        const response = await request.get(ordersRoute);
        expect(response.status).toBe(200);
    });
});
