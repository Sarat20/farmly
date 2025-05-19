import React from 'react';
import { Outlet } from 'react-router-dom';
import UserSideBar from '../components/UserSideBar';

const User = () => {
  return (
    <div className="flex flex-col min-h-screen">
  <UserSideBar />
  <main className="flex-grow p-4">
    <Outlet />
  </main>
</div>

  );
};

export default User;
