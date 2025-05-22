
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
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Addresses</h2>

      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Enter new address"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          className="border px-4 py-2 rounded w-full mr-2"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <ul className="space-y-3">
        {addresses.map((address, index) => (
          <li key={index} className="flex justify-between items-center border p-3 rounded">
            <span>{address}</span>
            <button
              onClick={() => removeAddress(index)}
              className="text-red-500 hover:text-red-700"
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
