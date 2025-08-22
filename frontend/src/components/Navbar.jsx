// frontend/src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import farmly_logo from '../assets/farmly_logo.png';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [userToken, setUserToken] = useState(null);
    const [vendorToken, setVendorToken] = useState(null);

    useEffect(() => {
        const checkTokens = () => {
            setUserToken(localStorage.getItem('token'));
            setVendorToken(localStorage.getItem('vtoken'));
        };

        checkTokens();
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

    let homeLinkTo = '/';
    if (userToken) {
        homeLinkTo = '/user/products'; 
    } else if (vendorToken) {
        homeLinkTo = '/vendor/dashboard';
    }

    return (
        <div className='bg-green-500 py-5 flex items-center justify-between text-white px-4 sm:px-10'>
            <div className='flex items-center space-x-2 sm:space-x-4'>
                <img src={farmly_logo} className='w-10 h-10 sm:w-12 sm:h-12 rounded-full' alt="farmly_logo" />
                <div className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold'>Welcome To Farmly</div>
            </div>

            <div className='flex items-center space-x-4 sm:space-x-8'>

                {!isAuthenticated && (
                    <NavLink to='/' className='text-base sm:text-lg hover:underline'>Home</NavLink>
                )}
                {isAuthenticated && userRole === 'customer' && (
                    <NavLink to='/user/products' className='text-base sm:text-lg hover:underline'>UserHome</NavLink>
                )}
                {isAuthenticated && userRole === 'vendor' && (
                    <NavLink to='/vendor/dashboard' className='text-base sm:text-lg hover:underline'>VendorHome</NavLink>
                )}

                {!isAuthenticated && (
                    <NavLink to='/user/login' className='text-base sm:text-lg hover:underline'>User Login</NavLink>
                )}

                {!isAuthenticated && (
                    <NavLink to='/vendor' className='text-base sm:text-lg hover:underline'>Vendor Login</NavLink>
                )}

                <NavLink to='/about' className='text-base sm:text-lg hover:underline'>About</NavLink>
                <NavLink to='/contact-us' className='text-base sm:text-lg hover:underline'>Contact Us</NavLink>

                {isAuthenticated ? (
                    <button
                        onClick={handleLogout}
                        className='px-3 py-1 sm:px-4 sm:py-2 text-white text-base sm:text-lg rounded-full
                                        transition-transform duration-500 ease-in-out hover:scale-110 bg-red-600 hover:bg-red-700'
                    >
                        Logout
                    </button>
                ) : (
                    <NavLink
                        to='/login' 
                        className='px-3 py-1 sm:px-4 sm:py-2 text-white text-base sm:text-lg rounded-full
                                        transition-transform duration-500 ease-in-out hover:scale-110 bg-gray-800'
                    >
                        Create Account
                    </NavLink>
                )}
            </div>
        </div>
    );
};

export default Navbar;