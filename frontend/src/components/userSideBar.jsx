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
    <div className="w-full bg-green-100 px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 sm:justify-between overflow-x-auto">
      {/* Buyer Panel Title */}
      <h2 className="text-xl font-bold whitespace-nowrap ml-2 sm:ml-10">Buyer Panel</h2>

      {/* Navigation Menu */}
      <div className="flex flex-wrap justify-center sm:justify-center gap-4 sm:gap-8">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-4 py-2 hover:bg-green-200 rounded-lg cursor-pointer transition-all duration-200"
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
