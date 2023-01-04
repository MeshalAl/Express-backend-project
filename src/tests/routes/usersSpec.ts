import supertest from 'supertest';
import app from '../..';
import { User } from '../../types/types';
import { JwtPayload, verify } from 'jsonwebtoken';

const { TOKEN_SECRET } = process.env;

const request = supertest(app);
const usersRoute = '/api/users';

let testToken: string;

describe('Users endpoints:', () => {
    const testUser: User = {
        firstname: '_testUser',
        lastname: 'testUser_',
        password: 'abc123',
    };

    it('Creating user sucessful', async () => {
        const response = await request
            .post(usersRoute)
            .set('Content-type', 'application/json')
            .send(testUser);
        expect(response.status).toBe(200);

        const { user_id, firstname, lastname, password } = response.body;
        testUser.user_id = user_id as number;

        expect(firstname).toBe(testUser.firstname);
        expect(lastname).toBe(testUser.lastname);
        expect(password).not.toBe(testUser.password);
    });
    it('Authenticate user and recieve token successful.', async () => {
        console.log(testUser);

        const response = await request
            .post(usersRoute + '/auth')
            .set('Content-type', 'application/json')
            .send({
                user_id: testUser.user_id,
                password: testUser.password,
            });
        expect(response.status).toBe(200);

        testToken = response.body;

        const decoded = verify(testToken, TOKEN_SECRET as string) as JwtPayload;

        expect(decoded.user.user_id).toBe(testUser.user_id);
        expect(decoded.user.firstname).toBe(testUser.firstname);
        expect(decoded.user.lastname).toBe(testUser.lastname);

        console.log('\nToken: ' + testToken + '\n');
    });
    it('Get index of users successful.', async () => {
        const response = await request
            .get(usersRoute)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${testToken}`);

        expect(response.status).toBe(200);
    });
    it('Get user by id successful.', async () => {
        const response = await request
            .get(usersRoute + `/${testUser.user_id}`)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${testToken}`);

        expect(response.status).toBe(200);

        const { user_id, firstname, lastname } = response.body;

        expect(user_id).toBe(testUser.user_id);
        expect(firstname).toBe(testUser.firstname);
        expect(lastname).toBe(testUser.lastname);
    });
});
