import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaBox, FaPlus, FaTruck, FaWallet, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';

const VendorSidebar = () => {
  const navigate = useNavigate();

  const menu = [
    { label: 'Dashboard', icon: <FaHome />, path: '/vendor/dashboard' },
    { label: 'Profile', icon: <FaUser />, path: '/vendor/profile' },
    { label: 'My Products', icon: <FaBox />, path: '/vendor/products' },
    { label: 'Add Product', icon: <FaPlus />, path: '/vendor/add-product' },
    { label: 'Delivery Area', icon: <FaTruck />, path: '/vendor/delivery-area' },
    { label: 'Payments', icon: <FaWallet />, path: '/vendor/payments' },
    { label: 'Support', icon: <FaQuestionCircle />, path: '/vendor/support' },
    { label: 'Logout', icon: <FaSignOutAlt />, path: '/vendor/logout' },  // Adjust this route if needed
  ];

  return (
    <div className="w-64 h-screen bg-green-100 p-4 shadow-xl">
      <h2 className="text-xl font-bold mb-6">Vendor Panel</h2>
      {menu.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-2 hover:bg-green-200 rounded-lg cursor-pointer"
          onClick={() => navigate(item.path)}
        >
          {item.icon}
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default VendorSidebar;
