import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_PRODUCTION, DB_TEST, DB_DEV, ENV } =
    process.env;
let client = new Pool();

if (ENV === 'production') {
    client = new Pool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_PRODUCTION,
    });
} else if (ENV === 'test') {
    client = new Pool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_TEST,
    });
} else {
    client = new Pool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DEV,
    });
}
console.log(`***********************${ENV}********************`);

export default client;
