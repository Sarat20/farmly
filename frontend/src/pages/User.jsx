import React from 'react';
import { Outlet } from 'react-router-dom';
import UserSideBar from '../components/userSideBar';
const User = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <UserSideBar />
      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>

  );
};

export default User;
