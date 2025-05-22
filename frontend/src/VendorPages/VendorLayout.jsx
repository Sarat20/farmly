import React from 'react';
import VendorSidebar from './VendorSidebar';
import { Outlet } from 'react-router-dom';

const VendorLayout = () => {
  return (
    <div className="flex">
      <VendorSidebar />
      <div className="flex-1 p-4 bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default VendorLayout;
