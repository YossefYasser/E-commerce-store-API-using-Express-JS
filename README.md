# E-commerce Store API using Express.js

Welcome to the E-commerce Store API project! This repository contains the backend code for an e-commerce platform, built using Express.js. The API handles various functionalities essential for running an e-commerce store, such as user authentication, product management, order processing, and more.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [API Endpoints](#api-endpoints)


## Installation

To get started with this project, follow the instructions below:

## Installation

To get started with this project, follow the instructions below:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YossefYasser/E-commerce-store-API-using-Express-JS.git
   cd E-commerce-store-API-using-Express-JS
2. **Install dependencies:**

```bash
npm install
```

3.**Set up environment variables:**
Create a .env file in the root directory and add the following variables:
```
```env
PORT=5000
DATABASE_URL=your-database-url
JWT_SECRET=your-secret-key
```
5.**Run the application:**

```bash
npm start
```
4.**Access the API:**
Once the application is running, you can access the API at http://localhost:3000.

## Features

- User authentication (register, login, logout)
- User profile management
- CRUD operations for products
- Order management
- Shopping cart functionality
- Secure password storage with bcrypt
- JWT-based authentication
- 
## API Endpoints

Here are some of the main API endpoints:

### User Endpoints

- **Register a new user**
  - `POST /api/auth/register`
  - **Request Body:**
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```

- **Login a user**
  - `POST /api/auth/login`
  - **Request Body:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

- **Logout a user**
  - `POST /api/auth/logout`

- **Get user profile**
  - `GET /api/users/:id`

- **Update user profile**
  - `PUT /api/users/:id`
  - **Request Body:**
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"  // Optional
    }
    ```

- **Delete user account**
  - `DELETE /api/users/:id`

### Product Endpoints

- **Get all products**
  - `GET /api/products`

- **Get a single product**
  - `GET /api/products/:id`

- **Create a new product**
  - `POST /api/products`
  - **Request Body:**
    ```json
    {
      "name": "string",
      "description": "string",
      "price": "number",
      "stock": "number"
    }
    ```

- **Update a product**
  - `PUT /api/products/:id`
  - **Request Body:**
    ```json
    {
      "name": "string",
      "description": "string",
      "price": "number",
      "stock": "number"
    }
    ```

- **Delete a product**
  - `DELETE /api/products/:id`

### Order Endpoints

- **Get all orders**
  - `GET /api/orders`

- **Get a single order**
  - `GET /api/orders/:id`

- **Create a new order**
  - `POST /api/orders`
  - **Request Body:**
    ```json
    {
      "userId": "string",
      "productId": "string",
      "quantity": "number"
    }
    ```

- **Update an order**
  - `PUT /api/orders/:id`
  - **Request Body:**
    ```json
    {
      "status": "string"
    }
    ```

- **Delete an order**
  - `DELETE /api/orders/:id`

## Thank You!

Thank you for checking out the E-commerce Store API project! I hope you find it useful and easy to use. If you have any questions, suggestions, or feedback, please don't hesitate to reach out or create an issue.

Happy coding!

- **Yossef Yasser**
