import React from 'react';
import { Outlet } from 'react-router-dom';
import BuyerSideBar from '../components/BuyerSideBar';

const Buyer = () => {
  return (
    <div className="flex">
      <BuyerSideBar />
      <div className="flex-grow p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Buyer;
