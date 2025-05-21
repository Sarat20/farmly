import React from 'react';
import { NavLink } from 'react-router-dom';
import farmly_logo from '../assets/farmly_logo.png';

const Navbar = () => {
  return (
    <div className='bg-green-500 py-5 flex items-center justify-between text-white px-10'>
      {/* Logo */}
      <div className='flex items-center space-x-4'>
        <img src={farmly_logo} className='w-12 h-12 rounded-full' alt="farmly_logo" />
        <div className='text-4xl font-semibold px-20'>Welcome To Farmly</div>
      </div>

      {/* Navigation Links */}
      <div className='flex items-center space-x-18'>
        <NavLink to='/' className='text-xl hover:underline'>Home</NavLink>
        <NavLink to='/vendor' className='text-xl hover:underline'>Vendor Login</NavLink>
        <NavLink to='/about' className='text-xl hover:underline'>About</NavLink>
        <NavLink to='/contact-us' className='text-xl hover:underline'>Contact Us</NavLink>
        <NavLink
          to='/login'
          className='px-4 py-2 text-white text-xl rounded-full transition-transform duration-500 ease-in-out hover:scale-110 bg-gray-800'
        >
          Create Account
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
