# 🌾 Farmly — Agro Product Marketplace

Farmly is a full-stack web application designed to streamline buying and selling of agricultural products.  
It allows vendors to list their products, manage orders, and track payments, while users can browse products, place orders, and manage their purchases—all in a seamless, responsive interface.

Farmly ensures a smooth experience for both desktop and mobile users.

---

## 🌐 Live Demo
🔗 [Visit Farmly on Render](https://farmly-frontend.onrender.com/)

---

## 🧰 Tech Stack
**Frontend:** React, Tailwind CSS, Axios, React Toastify, React Router  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, Multer  
**Authentication:** JWT (JSON Web Tokens)  
**Deployment:** Render  

---

## 🔑 Features

### 👨‍🌾 Vendor Features
- Vendor Registration/Login with profile photo upload  
- Add and manage products  
- View vendor-specific orders  
- Update order item status (e.g., processing, shipped, delivered)  
- View profile and update profile with photo  
- Track payments and order counts  

### 🛒 User Features
- User Registration/Login  
- Browse all products or view product details  
- Place orders  
- Cancel specific order items  
- View personal order history  

---

## 📦 API Endpoints

### 👤 User Routes
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/user/register` | Register a new user |
| POST | `/api/user/login` | Login as a user |
| GET | `/api/user/:userId` | Get orders of a specific user |
| POST | `/api/order/place` | Place a new order |
| PATCH | `/api/order/:orderId/items/:itemId/cancel` | Cancel a specific order item |

---

### 👨‍🌾 Vendor Routes
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/vendor/register` | Register a new vendor with profile photo |
| POST | `/api/vendor/login` | Login as a vendor |
| POST | `/api/vendor/add-product` | Add a new product with image upload |
| GET | `/api/vendor/my-products` | Get all products of the vendor |
| GET | `/api/vendor/profile` | Get vendor profile |
| PUT | `/api/vendor/update-profile` | Update vendor profile with photo |
| GET | `/api/vendor/payments` | View vendor payments |
| GET | `/api/vendor/order-count` | Get total vendor orders |
| GET | `/api/order/vendor` | Get orders assigned to the vendor |
| PATCH | `/api/order/:orderId/items/:itemId` | Update order item status |

---

### 🛍 Product Routes
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/product/all-products` | Fetch all products |
| GET | `/api/product/:id` | Fetch product details by ID |

---

## 📁 Project Structure
```bash
farmly/
├── backend/
│ ├── config/
│ │ └── mongodb.js
│ ├── controllers/
│ │ ├── orderController.js
│ │ ├── productController.js
│ │ ├── userController.js
│ │ └── vendorController.js
│ ├── middleware/
│ │ ├── authUser.js
│ │ ├── authVendor.js
│ │ └── multer.js
│ ├── models/
│ │ ├── OrderModel.js
│ │ ├── ProductModel.js
│ │ ├── UserModel.js
│ │ └── VendorModel.js
│ ├── routes/
│ │ ├── orderRoute.js
│ │ ├── productRoute.js
│ │ ├── userRoute.js
│ │ └── vendorRoute.js
│ ├── uploads/
│ └── node_modules/
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ │ ├── Footer.jsx
│ │ │ ├── Header.jsx
│ │ │ └── Navbar.jsx
│ │ ├── pages/
│ │ │ ├── Home.jsx
│ │ │ ├── Login.jsx
│ │ │ ├── Profile.jsx
│ │ │ └── VendorDashboard.jsx
│ │ ├── App.jsx
│ │ ├── index.css
│ │ └── main.jsx
│ └── node_modules/
