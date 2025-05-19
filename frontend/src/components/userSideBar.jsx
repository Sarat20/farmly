import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaStore,
  FaHeart,
  FaShoppingCart,
  FaBoxOpen,
  FaExchangeAlt,
  FaSignOutAlt
} from "react-icons/fa";

const UserSideBar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Products", icon: <FaStore />, path: '/user/products' },
    { label: "WishList", icon: <FaHeart />, path: '/user/wishlist' },
    { label: "My Cart", icon: <FaShoppingCart />, path: '/user/cart' },
    { label: "Orders", icon: <FaBoxOpen />, path: '/user/orders' },
    { label: "Transactions", icon: <FaExchangeAlt />, path: '/user/transactions' },
    { label: "Logout", icon: <FaSignOutAlt />, path: '/user/logout' },
  ];

  return (
    <div className="w-full bg-green-100 px-6 py-4 flex items-center justify-start overflow-x-auto">
      <h2 className="text-xl font-bold whitespace-nowrap mr-10 ml-20">Buyer Panel</h2>

      <div className="flex gap-6 flex-wrap">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-5 px-4 py-2 hover:bg-green-200 rounded-lg cursor-pointer transition-all duration-200"
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
