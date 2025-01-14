# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: `GET /products`
- Show `GET /products/:id`
- Create [token required] `POST /products`

#### Users
- Index [token required] `GET /users`
- Show [token required] `GET /users/:id`
- Create [token required] `POST /users`

#### Orders
- Current Order by user (args: user id)[token required] `GET /orders/current/user/:id`
- [OPTIONAL] Completed Orders by user (args: user id)[token required] `GET /orders/completed/user/:id`

## Data Shapes
#### Product
-  id
- name
- price
- category
Schema:
```
Table: products (
    id: int,
    name: varchar,
    price: decimal,
    category_id: int
)
```

#### User
- id
- firstName
- lastName
- password
Schema:
```
Table: users (
    id: int,
    first_name: varchar,
    last_name: varchar,
    password: varchar
)
```

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
Schema:
```
Table: orders (
    id: int
    user_id: int [foreign key to users table]
    status: int
)
```

#### Order products
- product id
- quantity
Schema:
```
Table: order_products (
    id: int
    order_id: int [foreign key to orders table],
    product_id: int [foreign key to products table],
    quantity: int
)
```