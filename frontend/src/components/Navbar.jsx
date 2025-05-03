import React from 'react';
import { NavLink } from 'react-router-dom';
import farmly_logo from '../assets/farmly_logo.png';
const Navbar = () => {
  return (
    <div className='bg-green-500 py-5 flex items-center justify-between text-white'>
     <img src={farmly_logo} className='w-12 h-12 rounded-full ml-10' alt="farmly_logo" />
     <div className='text-4xl'>Welcome To Farmly</div>
     <div className='flex space-x-10 mr-4'>
       
     <NavLink to='/' className='px-4 text-2xl hover:underline focus:underline active:underline'>Home</NavLink>
     <NavLink to='/about' className='px-4 text-2xl hover:underline focus:underline active:underline'>About</NavLink>
     <NavLink to='/contact-us' className='px-4 text-2xl hover:underline focus:underline active:underline'>Contact-Us</NavLink>
     <NavLink to='/login' className='px-4 text-green-400 text-2xl rounded-full transition-transform duration-500 ease-in-out hover:scale-110 active:scale-110 focus:scale-110  bg-white '>Create Account</NavLink>
     </div>
    </div>
  );
};

export default Navbar;
