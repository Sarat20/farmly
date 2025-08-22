import React from "react";
const Footer = () => {
  return (
    <div className="flex flex-col">
<<<<<<< HEAD
     
   
      <div className="bg-gray-700 text-white flex flex-row px-4 justify-between py-4">
        <div>
          <span className="text-2xl font-bold">Get to Know Us</span>
          <ul>About Farmly </ul>
=======
      {/* --this is footer top */}
      <div className="bg-gray-700 text-white flex flex-col md:flex-row flex-wrap px-4 justify-between py-4 gap-6">
        <div className="min-w-[200px]">
          <span className="text-xl font-bold block mb-2">Get to Know Us</span>
          <ul>About Farmly</ul>
>>>>>>> e771903f7a1856028baf42415d22041b4dd52dfc
          <ul>Farmly Releases</ul>
          <ul>Farmly Science</ul>
        </div>

        <div className="min-w-[200px]">
          <span className="text-xl font-bold block mb-2">Connect with Us</span>
          <ul>Facebook</ul>
          <ul>Twitter(x)</ul>
          <ul>Instagram</ul>
        </div>

        <div className="min-w-[200px]">
          <span className="text-xl font-bold block mb-2">Make Money With Us</span>
          <ul>Sell On Farmly</ul>
          <ul>Farmly Global Selling</ul>
          <ul>Supply to Farmly</ul>
          <ul>Become an Affiliate</ul>
        </div>

        <div className="min-w-[200px]">
          <span className="text-xl font-bold block mb-2">Let Us Help You</span>
          <ul>Your Account</ul>
          <ul>Help</ul>
        </div>
      </div>

<<<<<<< HEAD
     
      <div className="flex flex-col items-center bg-black text-white">
        <div className="flex flex-row space-x-7 mt-3">

          <p>Conditions of Use and Sell</p> 
=======
      {/* --this is footer bottom */}
      <div className="flex flex-col items-center bg-black text-white text-center">
        <div className="flex flex-col md:flex-row md:space-x-7 mt-3 space-y-1 md:space-y-0">
          <p>Conditions of Use and Sell</p>
>>>>>>> e771903f7a1856028baf42415d22041b4dd52dfc
          <p>Privacy Note</p>
          <p>Interest Based Ads</p>
        </div>
        <div className="py-3">
          <p>2025-, Farmly.com, Inc. or its affiliates</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
