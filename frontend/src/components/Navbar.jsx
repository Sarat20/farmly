// frontend/src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import farmly_logo from '../assets/farmly_logo.png';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [userToken, setUserToken] = useState(null);
    const [vendorToken, setVendorToken] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const checkTokens = () => {
            setUserToken(localStorage.getItem('token'));
            setVendorToken(localStorage.getItem('vtoken'));
        };

        checkTokens();
        setMobileOpen(false); // close mobile menu on route change
    }, [location]); // Re-run effect when the URL changes

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('vtoken');
        setUserToken(null);
        setVendorToken(null);
        navigate('/'); // Redirect to the default home page
    };

    // Determine authentication status and role
    const isAuthenticated = userToken || vendorToken;
    const userRole = userToken ? 'customer' : (vendorToken ? 'vendor' : null);

    // Determine the 'Home' link destination
    let homeLinkTo = '/';
    if (userToken) {
        homeLinkTo = '/user/products'; // Customer's home
    } else if (vendorToken) {
        homeLinkTo = '/vendor/dashboard'; // Vendor's home
    }

    return (
        <header className='sticky top-0 z-40 bg-green-500 text-white shadow'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='py-4 flex items-center justify-between'>
                    {/* Logo and Welcome Text */}
                    <div className='flex items-center gap-3'>
                        <img src={farmly_logo} className='w-10 h-10 sm:w-12 sm:h-12 rounded-full' alt="farmly_logo" />
                        <NavLink to={homeLinkTo} className='text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight'>
                            Welcome To Farmly
                        </NavLink>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className='hidden md:flex items-center gap-6'>
                        {!isAuthenticated && (
                            <NavLink to='/' className='text-base hover:underline'>Home</NavLink>
                        )}
                        {isAuthenticated && userRole === 'customer' && (
                            <NavLink to='/user/products' className='text-base hover:underline'>UserHome</NavLink>
                        )}
                        {isAuthenticated && userRole === 'vendor' && (
                            <NavLink to='/vendor/dashboard' className='text-base hover:underline'>VendorHome</NavLink>
                        )}

                        {!isAuthenticated && (
                            <NavLink to='/user/login' className='text-base hover:underline'>User Login</NavLink>
                        )}
                        {!isAuthenticated && (
                            <NavLink to='/vendor' className='text-base hover:underline'>Vendor Login</NavLink>
                        )}
                        <NavLink to='/about' className='text-base hover:underline'>About</NavLink>
                        <NavLink to='/contact-us' className='text-base hover:underline'>Contact Us</NavLink>

                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className='px-4 py-2 text-white text-base rounded-full transition-transform duration-300 hover:scale-105 bg-red-600 hover:bg-red-700'
                            >
                                Logout
                            </button>
                        ) : (
                            <NavLink
                                to='/login'
                                className='px-4 py-2 text-white text-base rounded-full transition-transform duration-300 hover:scale-105 bg-gray-900'
                            >
                                Create Account
                            </NavLink>
                        )}
                    </nav>

                    {/* Mobile menu button */}
                    <button
                        type='button'
                        aria-label='Open menu'
                        onClick={() => setMobileOpen((v) => !v)}
                        className='md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-white'
                    >
                        <svg className='h-6 w-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            {mobileOpen ? (
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                            ) : (
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Panel */}
            {mobileOpen && (
                <div className='md:hidden bg-green-600/95 backdrop-blur'>
                    <div className='px-4 py-3 space-y-2'>
                        {!isAuthenticated && (
                            <NavLink to='/' className='block py-2' onClick={() => setMobileOpen(false)}>Home</NavLink>
                        )}
                        {isAuthenticated && userRole === 'customer' && (
                            <NavLink to='/user/products' className='block py-2' onClick={() => setMobileOpen(false)}>UserHome</NavLink>
                        )}
                        {isAuthenticated && userRole === 'vendor' && (
                            <NavLink to='/vendor/dashboard' className='block py-2' onClick={() => setMobileOpen(false)}>VendorHome</NavLink>
                        )}
                        {!isAuthenticated && (
                            <NavLink to='/user/login' className='block py-2' onClick={() => setMobileOpen(false)}>User Login</NavLink>
                        )}
                        {!isAuthenticated && (
                            <NavLink to='/vendor' className='block py-2' onClick={() => setMobileOpen(false)}>Vendor Login</NavLink>
                        )}
                        <NavLink to='/about' className='block py-2' onClick={() => setMobileOpen(false)}>About</NavLink>
                        <NavLink to='/contact-us' className='block py-2' onClick={() => setMobileOpen(false)}>Contact Us</NavLink>

                        {isAuthenticated ? (
                            <button
                                onClick={() => { setMobileOpen(false); handleLogout(); }}
                                className='mt-2 w-full px-4 py-2 text-white rounded-full bg-red-600 hover:bg-red-700'
                            >
                                Logout
                            </button>
                        ) : (
                            <NavLink
                                to='/login'
                                onClick={() => setMobileOpen(false)}
                                className='mt-2 inline-block w-full text-center px-4 py-2 text-white rounded-full bg-gray-900'
                            >
                                Create Account
                            </NavLink>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;