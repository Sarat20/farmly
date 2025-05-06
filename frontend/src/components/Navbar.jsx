import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import farmly_logo from '../assets/farmly_logo.png';
import { MdLocationOn } from 'react-icons/md';
const locations = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai','Visakhapatnam'];

const Navbar = () => {
  const [location, setLocation] = useState('Visakhapatnam');
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const selectLocation = (loc) => {
    setLocation(loc);
    setShowDropdown(false);
  };

  return (
    <div className='bg-green-500 py-5 flex items-center justify-between text-white relative'>
      <img src={farmly_logo} className='w-12 h-12 rounded-full ml-10' alt="farmly_logo" />
      <div className='text-4xl'>Welcome To Farmly</div>

      <div className='flex items-center space-x-8 mr-10 relative'>
        <div className='relative'>
          <button onClick={toggleDropdown} className='text-2xl flex items-center hover:underline'>
            <MdLocationOn/> {location}
          </button>
          {showDropdown && (
            <div className='absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50'>
              {locations.map((loc) => (
                <div
                  key={loc}
                  onClick={() => selectLocation(loc)}
                  className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                >
                  {loc}
                </div>
              ))}
            </div>
          )}
        </div>




        {/* Nav Links */}
        <NavLink to='/' className='px-2 text-xl hover:underline'>Home</NavLink>
        <NavLink to='/vendor' className='px-2 text-xl hover:underline'>Vendor Login</NavLink>
        <NavLink to='/about' className='px-2 text-xl hover:underline'>About</NavLink>
        <NavLink to='/contact-us' className='px-2 text-xl hover:underline'>Contact-Us</NavLink>
        <NavLink
          to='/login'
          className='px-4 py-2 text-green-400 text-xl rounded-full transition-transform duration-500 ease-in-out hover:scale-110 bg-white'>
          Create Account
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
