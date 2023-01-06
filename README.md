
## Setup

- After downloading the project locally run `npm install` to install the the dependencies. 
- Create a local PSQL database.
- Create a .env file containing the following:
```
DB_USER = <your db user>
DB_PASSWORD = <your db password>

DB_HOST = localhost
DB_PORT = 5432

DB_PRODUCTION = production_db
DB_TEST = test_db
DB_DEV = dev_db

ENV = <'test' | 'dev'>

SALT = <Int>
PEPPER = <String>
TOKEN_SECRET = <String>
```
## Database setup

`CREATE USER <your_db_user> WITH PASSWORD <'your password'>;`

Create Databases:
```CREATE DATABASE test_db;
CREATE DATABASE dev_db;```

Granting access to users: 

``GRANT ALL PRIVILEGES ON DATABASE store_db TO full_stack_user;
GRANT ALL PRIVILEGES ON DATABASE store_test_db TO full_stack_user;``

Ports used:
```
Database: 5432
Backend: 3000 ```

## Endpoints:

# Users:
