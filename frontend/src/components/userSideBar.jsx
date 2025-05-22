import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaStore,
  FaHeart,
  FaShoppingCart,
  FaBoxOpen,
  FaSignOutAlt
} from "react-icons/fa";

const UserSideBar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Products", icon: <FaStore />, path: '/user/products' },
    { label: "WishList", icon: <FaHeart />, path: '/user/wishlist' },
    { label: "My Cart", icon: <FaShoppingCart />, path: '/user/cart' },
    { label: "Orders", icon: <FaBoxOpen />, path: '/user/orders' },
    { label: "Logout", icon: <FaSignOutAlt />, path: '/user/logout' },
  ];

  return (
    <div className="w-full bg-green-100 px-6 py-4 flex items-center overflow-x-auto">
      {/* Keeping Buyer Panel to the left */}
      <h2 className="text-xl font-bold whitespace-nowrap mr-10 ml-10">Buyer Panel</h2>

      {/* This div now takes remaining space and centers its children */}
      <div className="flex flex-1 justify-center gap-8 flex-wrap">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-5 px-6 py-2 hover:bg-green-200 rounded-lg cursor-pointer transition-all duration-200"
            onClick={() => navigate(item.path)}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-md font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSideBar;