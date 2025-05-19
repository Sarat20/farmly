// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Buyer from './pages/User';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Product from './pages/Product';
import ProductDetails from './pages/ProductDetails'; // ← new import
import Transactions from './pages/Transactions';
import Wishlist from './pages/Wishlist';
import UserLogout from './pages/UserLogout';

import Vendorlogin from './VendorPages/Vendorlogin';
import VendorLayout from './VendorPages/VendorLayout';
import VendorDashboard from './VendorPages/VendorDashboard';
import VendorProducts from './VendorPages/VendorProducts';
import VendorAddProduct from './VendorPages/VendorAddProduct';
import VendorProfile from './VendorPages/VendorProfile';
import VendorLogout from './VendorPages/VendorLogout';
import VendorSupport from './VendorPages/VendorSupport';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Buyer Routes */}
        <Route path="/user" element={<Buyer />}>
          <Route path="products" element={<Product />} />
          <Route path="products/:id" element={<ProductDetails />} /> {/* ← product detail route */}
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="logout" element={<UserLogout />} />
        </Route>

        {/* Vendor Login Route */}
        <Route path="/vendor" element={<Vendorlogin />} />

        {/* Vendor Dashboard & Protected Pages */}
        <Route path="/vendor/dashboard" element={<VendorLayout />}>
          <Route index element={<VendorDashboard />} />
          <Route path="products" element={<VendorProducts />} />
          <Route path="add-product" element={<VendorAddProduct />} />
          <Route path="profile" element={<VendorProfile />} />
          <Route path="logout" element={<VendorLogout />} />
          <Route path="support" element={<VendorSupport />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
