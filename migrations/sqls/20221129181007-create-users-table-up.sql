CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL, 
    lastName VARCHAR(100) NOT NULL, 
    password text NOT NULL 
);
