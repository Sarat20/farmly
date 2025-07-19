// frontend/src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import farmly_logo from '../assets/farmly_logo.png';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [userToken, setUserToken] = useState(null);
    const [vendorToken, setVendorToken] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setUserToken(localStorage.getItem('token'));
        setVendorToken(localStorage.getItem('vtoken'));
        setMenuOpen(false); // close menu on route change
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('vtoken');
        setUserToken(null);
        setVendorToken(null);
        navigate('/');
    };

    const isAuthenticated = userToken || vendorToken;
    const userRole = userToken ? 'customer' : (vendorToken ? 'vendor' : null);
    const homeLinkTo = userRole === 'customer' ? '/user/products' : userRole === 'vendor' ? '/vendor/dashboard' : '/';

    return (
        <header className="bg-green-500 text-white">
            <div className="flex items-center justify-between px-4 sm:px-10 py-4">
                {/* Logo and Heading */}
                <div className="flex items-center space-x-3">
                    <img src={farmly_logo} alt="Farmly Logo" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" />
                    <h1 className="text-xl sm:text-2xl font-bold">Welcome To Farmly</h1>
                </div>

                {/* Hamburger for mobile */}
                <div className="sm:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
                        {menuOpen ? '✖' : '☰'}
                    </button>
                </div>

                {/* Desktop Menu */}
                <nav className="hidden sm:flex items-center space-x-6">
                    {!isAuthenticated && <NavLink to="/" className="hover:underline">Home</NavLink>}
                    {isAuthenticated && userRole === 'customer' && <NavLink to="/user/products" className="hover:underline">UserHome</NavLink>}
                    {isAuthenticated && userRole === 'vendor' && <NavLink to="/vendor/dashboard" className="hover:underline">VendorHome</NavLink>}
                    {!isAuthenticated && <NavLink to="/user/login" className="hover:underline">User Login</NavLink>}
                    {!isAuthenticated && <NavLink to="/vendor" className="hover:underline">Vendor Login</NavLink>}
                    <NavLink to="/about" className="hover:underline">About</NavLink>
                    <NavLink to="/contact-us" className="hover:underline">Contact Us</NavLink>
                    {isAuthenticated ? (
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 rounded-full px-4 py-2 transition-transform hover:scale-105"
                        >
                            Logout
                        </button>
                    ) : (
                        <NavLink
                            to="/login"
                            className="bg-gray-800 px-4 py-2 rounded-full transition-transform hover:scale-105"
                        >
                            Create Account
                        </NavLink>
                    )}
                </nav>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="sm:hidden flex flex-col items-start space-y-4 px-6 pb-4">
                    {!isAuthenticated && <NavLink to="/" className="hover:underline" onClick={() => setMenuOpen(false)}>Home</NavLink>}
                    {isAuthenticated && userRole === 'customer' && <NavLink to="/user/products" className="hover:underline" onClick={() => setMenuOpen(false)}>UserHome</NavLink>}
                    {isAuthenticated && userRole === 'vendor' && <NavLink to="/vendor/dashboard" className="hover:underline" onClick={() => setMenuOpen(false)}>VendorHome</NavLink>}
                    {!isAuthenticated && <NavLink to="/user/login" className="hover:underline" onClick={() => setMenuOpen(false)}>User Login</NavLink>}
                    {!isAuthenticated && <NavLink to="/vendor" className="hover:underline" onClick={() => setMenuOpen(false)}>Vendor Login</NavLink>}
                    <NavLink to="/about" className="hover:underline" onClick={() => setMenuOpen(false)}>About</NavLink>
                    <NavLink to="/contact-us" className="hover:underline" onClick={() => setMenuOpen(false)}>Contact Us</NavLink>
                    {isAuthenticated ? (
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 rounded-full px-4 py-2 transition-transform hover:scale-105"
                        >
                            Logout
                        </button>
                    ) : (
                        <NavLink
                            to="/login"
                            className="bg-gray-800 px-4 py-2 rounded-full transition-transform hover:scale-105"
                            onClick={() => setMenuOpen(false)}
                        >
                            Create Account
                        </NavLink>
                    )}
                </div>
            )}
        </header>
    );
};

export default Navbar;
