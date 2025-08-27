
import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

const Address = () => {
  const { addresses, addAddress, removeAddress } = useContext(UserContext);
  const [newAddress, setNewAddress] = useState('');

  const handleAdd = () => {
    if (newAddress.trim()) {
      addAddress(newAddress);
      setNewAddress('');
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-2xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">My Addresses</h2>

      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Enter new address"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full mr-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Add
        </button>
      </div>

      <ul className="space-y-3">
        {addresses.map((address, index) => (
          <li key={index} className="flex justify-between items-center border p-3 rounded-lg bg-white shadow-sm hover:shadow transition-shadow">
            <span>{address}</span>
            <button
              onClick={() => removeAddress(index)}
              className="text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Address;
