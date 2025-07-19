# Create a README.md file with the latest content provided by the user

readme_content = """
## 📦 Farmly — Farm-to-Home E-commerce Platform

Farmly is a full-stack web platform that connects local farm vendors with customers, enabling direct purchase of agricultural products. It supports real-time order tracking, multi-vendor product listings, and vendor-specific order management.

### 🌐 Live Demo  
[Farmly App](https://farmly-frontend.onrender.com)

---

## 🛠️ Tech Stack

**Frontend**: React.js, Tailwind CSS, Axios, React Router  
**Backend**: Node.js, Express.js, MongoDB, Cloudinary, JWT, Multer  
**Deployment**: Render, MongoDB Atlas

---

## ✨ Features

### 👤 User
- Register/Login
- Browse products
- Add to cart and checkout
- View & update profile
- Track orders
- Cancel items in orders

### 🛍️ Vendor
- Register/Login
- Add/edit/delete products
- View orders received
- Update item delivery status
- View profile & earnings

---

## 📡 API Routes

### 👤 User Routes (`/api/user`)
| Method | Endpoint         | Description     |
|--------|------------------|-----------------|
| POST   | `/register`      | Register user   |
| POST   | `/login`         | Login user      |

---

### 🛍️ Vendor Routes (`/api/vendor`)
| Method | Endpoint              | Description                        |
|--------|------------------------|------------------------------------|
| POST   | `/register`           | Vendor registration (with photo)   |
| POST   | `/login`              | Vendor login                       |
| POST   | `/add-product`        | Add new product (auth, with image) |
| GET    | `/my-products`        | View vendor’s own products         |
| GET    | `/profile`            | Get vendor profile (auth)          |
| PUT    | `/update-profile`     | Update profile (auth, with photo)  |
| GET    | `/payments`           | Get payment history (auth)         |
| GET    | `/order-count`        | Get order statistics (auth)        |

---

### 🛒 Product Routes (`/api/products`)
| Method | Endpoint         | Description               |
|--------|------------------|---------------------------|
| GET    | `/all-products`  | Get all products          |
| GET    | `/:id`           | Get product by ID         |

---

### 📦 Order Routes (`/api/orders`)
| Method | Endpoint                                             | Description                                |
|--------|------------------------------------------------------|--------------------------------------------|
| POST   | `/place`                                             | Place an order                             |
| GET    | `/user/:userId`                                      | Get all orders of a user                   |
| PATCH  | `/:orderId/items/:itemId/cancel`                     | Cancel a specific item in an order         |
| GET    | `/vendor`                                            | Get all vendor orders (auth required)      |
| PATCH  | `/:orderId/items/:itemId`                            | Update delivery status (auth, vendor only) |

> 🔒 Most routes require JWT authentication with the header:  
`Authorization: Bearer <token>`

---

## 🗂️ Project Structure

farmly/
├── backend/
│ ├── config/ # DB & Cloudinary configs
│ ├── controllers/ # Route logic (users, vendors, orders)
│ ├── middlewares/ # Auth, multer for image uploads
│ ├── models/ # Mongoose schemas
│ ├── routes/ # Express routers
│ └── server.js # Main server entry
│
├── frontend/
│ ├── src/
│ │ ├── components/ # Shared components (Navbar, Cards, etc.)
│ │ ├── pages/ # Route-based page views
│ │ ├── App.jsx # App wrapper
│ │ └── main.jsx # ReactDOM entry point
│
└── .env # Environment variables
