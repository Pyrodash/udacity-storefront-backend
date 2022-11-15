# Storefront Backend Project

## Setup

### Requirements
1. PostgreSQL
2. Node.js
3. C++ Build Tools (required by the `bcrypt` package)

### Environment
Rename the `.env.sample` file to `.env` and place your configuration in it. You may leave most database variables empty and the defaults will be used.

#### Notes
The server will run on port 3000 by default, but you may configure it by specifying a `PORT` environment variable.

### Database

#### Creation
1. Connect to the PostgreSQL terminal
```sh
psql -u postgres
```
2. Create a new user
```sql
CREATE USER storefront_user WITH PASSWORD = 'your pass here';
```
3. Create a new database
```sql
CREATE DATABASE storefront;
```
4. Create a database for testing
```sql
CREATE DATABASE storefront_test;
```
5. Grant the needed privileges to the new user in both databases
```sql
GRANT ALL PRIVILEGES ON DATABASE storefront TO storefront_user;
GRANT ALL PRIVILEGES ON DATABASE storefront_test TO storefront_user;
```

#### Migrations
Run the following command:
```sh
npm run migrate-up
```

### Installation
Run the following command:
```sh
npm install
```

## Usage
To start the server, run thee following command:
```sh
npm start
```