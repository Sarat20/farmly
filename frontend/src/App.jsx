// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Buyer from './pages/Buyer';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Product from './pages/Product';
import Transactions from './pages/Transactions';
import Wishlist from './pages/Wishlist';

import Vendorlogin from './VendorPages/Vendorlogin';
import VendorLayout from './VendorPages/VendorLayout';
import VendorDashboard from './VendorPages/VendorDashboard';
import VendorProducts from './VendorPages/VendorProducts';
import VendorAddProduct from './VendorPages/VendorAddProduct';
import VendorProfile from './VendorPages/VendorProfile';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vendor" element={<Vendorlogin />} />

        {/* Buyer Layout */}
        <Route path="/buyer" element={<Buyer />}>
          <Route path="products" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Route>

        {/* Vendor Layout (Nested) */}
        <Route path="/dashboard" element={<VendorLayout />}>
          <Route index element={<VendorDashboard />} />
          <Route path="products" element={<VendorProducts />} />
          <Route path="add-product" element={<VendorAddProduct />} />
          <Route path="profile" element={<VendorProfile />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
