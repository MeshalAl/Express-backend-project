import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_PRODUCTION, DB_TEST, DB_DEV } =
    process.env;

const client = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_TEST,
});

export default client;
