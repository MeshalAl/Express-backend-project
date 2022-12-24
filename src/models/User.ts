import client from '../database';
import bcrypt from 'bcrypt';
import { User } from '../types/types';

const { SALT, PEPPER } = process.env;

class UserModel {
    async create(user: User): Promise<User> {
        try {
            const conn = await client.connect();
            const query =
                'INSERT INTO users (firstname, lastname, password ) VALUES($1, $2, $3) RETURNING *';

            const hashedPassword = bcrypt.hashSync(
                user.password + PEPPER,
                Number(SALT)
            );

            const result = await conn.query(query, [
                user.firstname,
                user.lastname,
                hashedPassword,
            ]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `[Error] Failed to create user on database:\n ${error} `
            );
        }
    }
    async index(): Promise<User[]> {
        try {
            const conn = await client.connect();
            const query = 'SELECT user_id, firstname, lastname FROM users;';
            const result = await conn.query(query);

            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(
                `[Error] Failed to fetch user from database:\n ${error} `
            );
        }
    }
    async show(user_id: number): Promise<User> {
        try {
            const conn = await client.connect();
            const query =
                'SELECT user_id, firstname, lastname FROM users WHERE user_id = $1;';
            const result = await conn.query(query, [user_id]);

            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `[Error] Failed to fetch user from database:\n ${error} `
            );
        }
    }
    async authenticate(
        user_id: number,
        password: string
    ): Promise<User | null> {
        try {
            const conn = await client.connect();
            const passwordQuery = 'SELECT password FROM users WHERE user_id = $1;';
            const passwordResult = await conn.query(passwordQuery, [user_id]);
            const hashedPassword = passwordResult.rows[0];

            if (!hashedPassword) {
                conn.release();
                return null;
            }
            const passwordCheck = bcrypt.compareSync(
                `${password}${PEPPER}`,
                hashedPassword.password
            );

            if (passwordCheck) {
                const userQuery =
                    'SELECT user_id, firstname, lastname FROM users WHERE user_id = $1;';
                const userResult = await conn.query(userQuery, [user_id]);
                conn.release();
                return userResult.rows[0];
            }
            conn.release();
            return null;
        } catch (error) {
            throw new Error(
                `[Error] Failed to authenticate user from database:\n ${error} `
            );
        }
    }
}
export default UserModel;
