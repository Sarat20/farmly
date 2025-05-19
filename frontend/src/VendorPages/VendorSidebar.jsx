import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaBox, FaPlus, FaTruck, FaWallet, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';

const VendorSidebar = () => {
  const navigate = useNavigate();

 const menu = [
  { label: 'Dashboard', icon: <FaHome />, path: '/vendor/dashboard' },
  { label: 'Profile', icon: <FaUser />, path: '/vendor/dashboard/profile' },
  { label: 'My Products', icon: <FaBox />, path: '/vendor/dashboard/products' },
  { label: 'Add Product', icon: <FaPlus />, path: '/vendor/dashboard/add-product' },
  { label: 'Delivery Area', icon: <FaTruck />, path: '/vendor/dashboard/delivery-area' },
  { label: 'Payments', icon: <FaWallet />, path: '/vendor/dashboard/payments' },
  { label: 'Support', icon: <FaQuestionCircle />, path: '/vendor/dashboard/support' },
  { label: 'Logout', icon: <FaSignOutAlt />, path: '/vendor/dashboard/logout' },
];


  return (
    <div className="w-64 h-auto bg-green-100 p-4 shadow-xl">
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
