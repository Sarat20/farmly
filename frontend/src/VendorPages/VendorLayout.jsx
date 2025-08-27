import React from 'react';
import VendorSidebar from './VendorSidebar';
import { Outlet } from 'react-router-dom';

const VendorLayout = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <VendorSidebar />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default VendorLayout;
