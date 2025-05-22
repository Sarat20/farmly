import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import About from './components/About';
import Contact from './components/Contact';

import { UserProvider } from './context/UserContext';

import Home from './pages/Home';
import Login from './pages/Login'; // Your existing Login component
import Buyer from './pages/User'; // Renamed from Buyer to User for clarity if it's a layout
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Product from './pages/Product';
import ProductDetails from './pages/ProductDetails';
import Wishlist from './pages/Wishlist';
import UserLogout from './pages/UserLogout';
import Checkout from './pages/Checkout';

import Vendorlogin from './VendorPages/Vendorlogin';
import VendorLayout from './VendorPages/VendorLayout';
import VendorDashboard from './VendorPages/VendorDashboard';
import VendorProducts from './VendorPages/VendorProducts';
import VendorAddProduct from './VendorPages/VendorAddProduct';
import VendorProfile from './VendorPages/VendorProfile';
import VendorLogout from './VendorPages/VendorLogout';
import VendorSupport from './VendorPages/VendorSupport';

import AddressManager from './pages/Address';
import VendorOrder from './VendorPages/VendorOrder';
import VendorPayment from './VendorPages/VendorPayment';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/login" element={<Login />} /> {/* NEW: Route for User Login */}
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />

          {/* Buyer/User Routes */}
          <Route path="/user" element={<Buyer />}>
            <Route path="products" element={<Product />} />
            <Route path="products/:id" element={<ProductDetails />} />
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<Orders />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="logout" element={<UserLogout />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="addresses" element={<AddressManager />} />
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
            <Route path="orders" element={<VendorOrder />} />
            <Route path="support" element={<VendorSupport />} />
            <Route path="payments" element={<VendorPayment />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
};

export default App;