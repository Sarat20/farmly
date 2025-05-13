import React from 'react';
import VendorSidebar from './VendorSidebar';

const productTypes = [
  { name: "Fresh Produce", emoji: "🥦", color: "bg-green-100" },
  { name: "Seeds & Saplings", emoji: "🌱", color: "bg-lime-100" },
  { name: "Dry & Raw Produce", emoji: "🥥", color: "bg-yellow-100" },
  { name: "Farm-Made Products", emoji: "🧴", color: "bg-orange-100" },
];

const VendorDashboard = () => {
  return (
    <div className="flex">
     
      <div className="flex-1 p-4 bg-gray-100 min-h-screen">
        <h1 className="text-xl font-bold mb-4">Welcome, Amma from GreenFarm</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div className="bg-white p-3 rounded shadow">
            <h2 className="text-base font-semibold">Total Products</h2>
            <p className="text-lg">12</p>
          </div>
          <div className="bg-white p-3 rounded shadow">
            <h2 className="text-base font-semibold">Total Orders</h2>
            <p className="text-lg">34</p>
          </div>
          <div className="bg-white p-3 rounded shadow">
            <h2 className="text-base font-semibold">Earnings</h2>
            <p className="text-lg">₹25,000</p>
          </div>
        </div>

        {/* Recent Products */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Recent Products</h2>
          <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm">
            Add New Product
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div className="bg-white p-3 rounded shadow">
            <h3 className="font-semibold">Tomatoes</h3>
            <p className="text-sm">₹20/kg · 100kg</p>
          </div>
          <div className="bg-white p-3 rounded shadow">
            <h3 className="font-semibold">Bananas</h3>
            <p className="text-sm">₹30/dozen · 80 dozen</p>
          </div>
        </div>

        {/* Product Types */}
        <h2 className="text-lg font-semibold mb-2">Product Types</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {productTypes.map((type, i) => (
            <div key={i} className={`p-3 rounded shadow text-sm ${type.color}`}>
              <div className="text-xl">{type.emoji}</div>
              <div className="font-semibold mt-1">{type.name}</div>
              <div className="text-gray-600">View / Manage</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
