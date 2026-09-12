E-Commerce Backend Project

Project Overview
This backend is built with Node.js, Express.js, and MongoDB using Mongoose.
It provides APIs for:
- User registration and login
- Product listing, creation, update, and deletion
- Cart management
- Order management
- Admin access control

Folder Structure
backend/
  index.js
  package.json
  .env
  controller/
    ProductController.js
    cartController.js
    orderController.js
    userController.js
  db/
    connectDB.js
  middleware/
    adminMiddleware.js
    authMiddleware.js
  models/
    cartSchema.js
    orderSchema.js
    productSchema.js
    userSchema.js
  routes/
    cartRoute.js
    orderRoute.js
    productRoute.js
    userRoute.js

Setup Instructions
1. Open terminal in backend folder
2. Install dependencies:
   npm install
3. Create a .env file in backend folder
4. Add the following values:

   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
   JWT_SECRET=your_secret_key_here

5. Start the server:
   npm run dev

Server will run at:
http://localhost:5000

Auth System
- User login route: POST /api/login
- User register route: POST /api/register
- Token is sent in Authorization header as:
  Bearer <token>
- Admin routes require both auth and admin middleware.

API Routes
User Routes
POST /api/register
POST /api/login

Product Routes
GET /api/product/
GET /api/product/:id
POST /api/product/add
DELETE /api/product/delete/:id
PUT /api/product/update/:id

Cart Routes
GET /api/cart/
POST /api/cart/addToCart
PATCH /api/cart/decreaseCartQuantity

Order Routes
GET /api/order/
POST /api/order/addOrder

Important Notes
- Product routes for add/update/delete require admin token.
- Use MongoDB locally or update MONGO_URI for your cluster.
- Ensure JWT_SECRET is strong and unique.
- For admin access, set user role as admin when creating the user in database.

Example Register Request
{
  "email": "admin@gmail.com",
  "password": "123456"
}

Example Login Request
{
  "email": "admin@gmail.com",
  "password": "123456"
}

Example Product Add Request
{
  "name": "Laptop",
  "description": "Gaming laptop",
  "price": 120000,
  "category": "Electronics",
  "stock": 10,
  "image": "https://example.com/laptop.jpg"
}

Project Status
This project is a working Express + MongoDB backend structure for an ecommerce application.
It can be extended with frontend integration, validation, and more business logic.
