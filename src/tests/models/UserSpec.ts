import exp from 'constants';
import test from 'node:test';
import supertest from 'supertest';
import app from '../..';
import UserModel from '../../models/User';
import { User } from '../../types/types';

const user = new UserModel();

const testUser: User = {
    user_id: undefined,
    firstname: 'user test FN 001',
    lastname: 'user test FN 001',
    password: 'unhashed password',
};
describe('USer model tests:', () => {
    it('Creation of user on model successful ', async () => {
        const result = await user.create(testUser);

        expect(result.user_id).toBeDefined();
        expect(result.firstname).toBe(testUser.firstname);
        expect(result.lastname).toBe(testUser.lastname);
        expect(result.password).not.toBe(testUser.password);

        testUser.user_id = Number(result.user_id);
    });
    it('Authenticate and get token on user model successful ', async () => {
        const result = await user.authenticate(
            testUser.user_id as number,
            testUser.password
        );

        expect(result).toBeDefined();
        console.log(`Token from User Model: ` + result);
    });
    it('No token on invalid user auth on model successful ', async () => {
        const result = await user.authenticate(
            testUser.user_id as number,
            'invalid password'
        );

        expect(result).toBe(null);
        console.log(`Token from incorrect auth: ` + result);
    });
    it('Show user by id successful ', async () => {
        const result = await user.show(testUser.user_id as number);

        expect(result.user_id).toBe(testUser.user_id);
        expect(result.firstname).toBe(testUser.firstname);
        expect(result.lastname).toBe(testUser.lastname);
        expect(result.password).toBeUndefined();

        console.log(`Token from incorrect auth: ` + result);
    });
    it('get list of all users. successful ', async () => {
        const testUser2: User = {
            user_id: undefined,
            firstname: 'user test FN 002',
            lastname: 'user test FN 002',
            password: 'unhashed password 2',
        };
        const createResult = await user.create(testUser2);

        testUser2.user_id = createResult.user_id;

        const userIndex = await user.index();

        expect(userIndex[1].user_id).toBe(testUser.user_id);
        expect(userIndex[1].firstname).toBe(testUser.firstname);
        expect(userIndex[1].lastname).toBe(testUser.lastname);
        expect(userIndex[1].password).toBeUndefined();

        expect(userIndex[0].user_id).toBe(testUser2.user_id);
        expect(userIndex[0].firstname).toBe(testUser2.firstname);
        expect(userIndex[0].lastname).toBe(testUser2.lastname);
        expect(userIndex[0].password).toBeUndefined();
    });
});
