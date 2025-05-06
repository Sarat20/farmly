import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col">
     
      {/* --this is footer top */}
      <div className="bg-gray-700 text-white flex flex-row px-4 justify-between py-4">
        <div>
          <span className="text-2xl font-bold">Get to Know Us</span>
          <ul>About Farmly </ul>
          <ul>Farmly Releases</ul>
          <ul>Farmly Science</ul>
        </div>

        <div>
         
          <span className="text-2xl font-bold"> Connect with Us</span>
          <ul>Facebook</ul>
          <ul>Twitter(x)</ul>
          <ul>Instagram</ul>
        </div>

        <div>
          
          <span className="text-2xl font-bold"> Make Money With Us</span>
          <ul>Sell On Farmly</ul>
          <ul>Farmly Global Selling</ul>
          <ul>Suppy to Farmly</ul>
          <ul>Become an Affliate</ul>
        </div>

        <div>
          
          <span className="text-2xl font-bold">Let Us help You</span>
          <ul>Your Account</ul>
          <ul>Help</ul>
        </div>

      </div>

      {/* this is about footer end */}

      <div className="flex flex-col items-center bg-black text-white">
        <div className="flex flex-row space-x-7 mt-3">

          <p>Conditions of Use and Sell</p> 
          <p>Privacy Note</p>
          <p>Interest Based Adds</p>
        </div>
        <div className="py-3">
            <p>2025-, Farmly.com, Inc.  or its affliates</p>
        </div>

      </div>
    </div>
  );
};

export default Footer;
