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
    <div className="p-4 max-w-xl mx-auto w-full">
      <h2 className="text-2xl font-semibold mb-4 text-center sm:text-left">My Addresses</h2>

      <div className="mb-4 flex flex-col sm:flex-row gap-2 sm:gap-0">
        <input
          type="text"
          placeholder="Enter new address"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          className="border px-4 py-2 rounded w-full sm:mr-2"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
        >
          Add
        </button>
      </div>

      <ul className="space-y-3">
        {addresses.map((address, index) => (
          <li key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border p-3 rounded gap-2">
            <span className="break-words w-full">{address}</span>
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
