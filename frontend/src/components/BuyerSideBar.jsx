import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaStore,
  FaHeart,
  FaShoppingCart,
  FaBoxOpen,
  FaExchangeAlt
} from "react-icons/fa";

const BuyerSideBar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Products", icon: <FaStore />, route: '/buyer/products' },
    { label: "WishList", icon: <FaHeart />, route: '/buyer/wishlist' },
    { label: "My Cart", icon: <FaShoppingCart />, route: '/buyer/cart' },
    { label: "Orders", icon: <FaBoxOpen />, route: '/buyer/orders' },
    { label: "Transactions", icon: <FaExchangeAlt />, route: '/buyer/transactions' },
  ];

  return (
    <div className="flex flex-col w-52 px-4 py-6 space-y-4 bg-gray-100 shadow-md rounded-md">
      {menuItems.map((item, index) => (
        <div
          key={index}
          onClick={() => navigate(item.route)}
          className="flex items-center justify-between bg-[#FFC145] hover:bg-yellow-400 text-black px-4 py-2 rounded-md cursor-pointer transition duration-200"
        >
          <span className="text-md font-medium">{item.label}</span>
          <span className="text-lg">{item.icon}</span>
        </div>
      ))}
    </div>
  );
};

export default BuyerSideBar;
