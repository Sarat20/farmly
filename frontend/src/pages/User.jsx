import React from 'react';
import { Outlet } from 'react-router-dom';
import UserSideBar from '../components/userSideBar';

const User = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/4">
        <UserSideBar />
      </div>
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default User;
