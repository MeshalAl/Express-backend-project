import client from '../database';
import bcrypt from 'bcrypt';

const { SALT, PEPPER } = process.env;

/*id SERIAL PRIMARY KEY,
firstName VARCHAR(100) NOT NULL,
lastName VARCHAR(100) NOT NULL,
password text NOT NULL */

export type User = {
    id?: string;
    firstname: string;
    lastname: string;
    password: string;
};
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
            const query = 'SELECT id, firstname, lastname FROM users;';
            const result = await conn.query(query);

            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(
                `[Error] Failed to fetch user from database:\n ${error} `
            );
        }
    }
    async show(id: number): Promise<User> {
        try {
            const conn = await client.connect();
            const query =
                'SELECT id, firstname, lastname FROM users WHERE id = $1;';
            const result = await conn.query(query, [id]);

            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `[Error] Failed to fetch user from database:\n ${error} `
            );
        }
    }
    async authenticate(id: number, password: string): Promise<User | null> {
        try {
            const conn = await client.connect();
            const passwordQuery = 'SELECT password FROM users WHERE id = $1;';
            const passwordResult = await conn.query(passwordQuery, [id]);
            const hashedPassword = passwordResult.rows[0];

            const passwordCheck = bcrypt.compareSync(
                `${password}${PEPPER}`,
                hashedPassword.password
            );

            if (passwordCheck) {
                const userQuery =
                    'SELECT id, firstname, lastname FROM users WHERE id = $1;';
                const userResult = await conn.query(userQuery, [id]);
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
