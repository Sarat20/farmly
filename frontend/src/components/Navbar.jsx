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
<<<<<<< HEAD
        const checkTokens = () => {
            setUserToken(localStorage.getItem('token'));
            setVendorToken(localStorage.getItem('vtoken'));
        };

        checkTokens();
    }, [location]); 
=======
        setUserToken(localStorage.getItem('token'));
        setVendorToken(localStorage.getItem('vtoken'));
        setMenuOpen(false); // close menu on route change
    }, [location]);
>>>>>>> e771903f7a1856028baf42415d22041b4dd52dfc

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('vtoken');
        setUserToken(null);
        setVendorToken(null);
<<<<<<< HEAD
        navigate('/'); 
=======
        navigate('/');
>>>>>>> e771903f7a1856028baf42415d22041b4dd52dfc
    };

    const isAuthenticated = userToken || vendorToken;
    const userRole = userToken ? 'customer' : (vendorToken ? 'vendor' : null);
<<<<<<< HEAD

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
=======
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
>>>>>>> e771903f7a1856028baf42415d22041b4dd52dfc
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
