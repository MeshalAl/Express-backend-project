
## Setup
- Clone `https://github.com/MeshalAl/Express-backend-project.git`
- `npm install` to install dependencies. 
- Create a local PSQL database.
- Create a .env file, edit the brackets `<>` with your values:
```
DB_USER = <your db user>
DB_PASSWORD = <your db password>

DB_HOST = <localhost | your db host>
DB_PORT = <5432 | your db port>

DB_PRODUCTION = production_db
DB_TEST = test_db
DB_DEV = dev_db

ENV = 'dev'

SALT = <Int>
PEPPER = <String>
TOKEN_SECRET = <String>
```
## Database setup

`CREATE USER <your_db_user> WITH PASSWORD <'your password'>;`

**Create Databases:**<br/>
`CREATE DATABASE test_db;`<br/>
`CREATE DATABASE dev_db;`<br/>

**Granting access to users:**<br/>

`GRANT ALL PRIVILEGES ON DATABASE test_db TO <your_db_user>;`<br/>
`GRANT ALL PRIVILEGES ON DATABASE dev_db TO <your_db_user>;`<br/>

**Ports used:**
`Database: 5432`<br/>
`Backend: 3000`<br/>

## Commands:

start nodemon:  
`npm run start`  

start jasmine tests & db-migrates on windows: 
 
`npm run test-windows` for windows.  
`npm run test-linux` for linux.  


## Endpoints:



### Users:

**Create:**  
post on `localhost:3000/api/users`
Body format: 
```JSON
{
    "firstname": "value",
    "lastname": "value",
    "password": "value"
}
```
Returns 
```JSON
{
    "user_id": 1,
    "firstname": "value",
    "lastname": "value",
    "password": "hashed_password"
}
```
**Authenticate:**  
post on `localhost:3000/api/users/auth`

Body format: 
```JSON
{
    "user_id": 1,
    "password": "value"
}
```
Returns:
`"TOKEN"`

**User index:**  
get on `localhost:3000/api/users`<br/>
Autherization header: `"bearer TOKEN"` <br/>
Returns:
```JSON
[
    {
        "user_id": 1,
        "firstname": "User firtname",
        "lastname": "User lastname"
    },
    ...
]
```
**User by id:**  
get on `localhost:3000/api/users/[user id: int]`<br/>
Autherization header: `"bearer TOKEN"`<br/>
Returns:
```JSON
{
    "user_id": 1,
    "firstname": "User firtname",
    "lastname": "User lastname"
}
```
---
### Products:  
**Create:**  
post on `localhost:3000/api/products`<br/>
Autherization header: `"bearer TOKEN"`<br/>

Body format: 
```JSON
{
    "product_name": "product name",
    "price": 29.59,
    "category": "category name: optional"
}
```  
Returns:
```JSON
{
    "product_id": 1,
    "product_name": "product name",
    "price": 29.59,
    "category": "category name: optional"
}
```
**Index of products:**  
get on `localhost:3000/api/products`<br/>

Returns:
```JSON
[
    {
      "product_id": 1,
      "product_name": "product name",
      "price": 29.59,
      "category": "category name: optional"
    },
    ...
]
```
**Product by id:**  
get on `localhost:3000/api/products/[product_id]`<br/>

Returns:
```JSON
{
  "product_id": 1,
  "product_name": "product name",
  "price": 29.59,
  "category": "category name: optional"
}
```
---
### Orders:  

**Create Order:**  
post on `localhost:3000/api/orders`<br/>
Autherization header: `"bearer TOKEN"`<br/>
Body format:  
```JSON
{
    "Products": [ 
        { "product_id": 1, "quantity": 4},
        ...
    ]
}
```
Returns:  
```JSON
[
    {
        "order_id": 1,
        "user_id": 1,
        "product_name": "test product",
        "quantity": 4,
        "price": 29.59,
        "status": "active",
        "order_date": "2023-01-02T19:33:32.388Z"
    },
    ...
]
```
**index of current user's order:**  
get on `localhost:3000/api/orders`<br/>
Autherization header: `"bearer TOKEN"`<br/>

Returns:  
```JSON
[
    {
        "order_id": 1,
        "user_id": 1,
        "product_name": "test product",
        "quantity": 4,
        "price": 29.59,
        "status": "active",
        "order_date": "2023-01-02T19:33:32.388Z"
    },
    ...
]
```
**get current user's order by id:**  
get on `localhost:3000/api/orders/[order_id]`<br/>
Autherization header: `"bearer TOKEN"`<br/>

Returns:  
```JSON
[
    {
        "order_id": 1,
        "user_id": 1,
        "product_name": "test product",
        "quantity": 4,
        "price": 29.59,
        "status": "active",
        "order_date": "2023-01-02T19:33:32.388Z"
    },
    ...
]
```
**Complete user's order:**  
post on `localhost:3000/api/orders/complete/`<br/>
Autherization header: `"bearer TOKEN"`<br/>

Body format:  
```
{
  "order_id": 1,
  "all" [Optional]: true | false
}
```
Returns:  
```JSON
[
    {
        "order_id": 1,
        "user_id": "1",
        "status": "completed",
        "order_date": "2023-01-02T19:33:32.388Z"
    },
    ...
]
```
**Order history:**  
get on `localhost:3000/api/orders/history`<br/>
Autherization header: `"bearer TOKEN"`<br/>

Returns:  
```JSON
[
    {
        "order_id": 1,
        "user_id": 1,
        "product_name": "test product",
        "quantity": 4,
        "price": 29.59,
        "status": "completed",
        "order_date": "2023-01-06T19:33:32.388Z"
    },
    ...
]
```

