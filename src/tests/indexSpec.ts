import supertest from 'supertest';
import app from '..';

const request = supertest(app);

describe('index endpoint tests:', () => {
    it('Expect endpoint response', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
});
