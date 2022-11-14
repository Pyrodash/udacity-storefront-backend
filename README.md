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