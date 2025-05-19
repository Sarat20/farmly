// src/pages/Wishlist.jsx
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { FaTrash } from 'react-icons/fa';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(UserContext);

  if (wishlist.length === 0) {
    return <p className="p-4">Your wishlist is empty.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Wishlist</h2>
      <ul className="space-y-4">
        {wishlist.map((product) => (
          <li
            key={product._id}
            className="flex items-center border p-4 rounded-lg shadow-sm"
          >
            <img
              src={product.Image}
              alt={product.Name}
              className="w-24 h-24 object-cover rounded mr-4"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{product.Name}</h3>
              <p className="text-gray-600">₹{product.Price}</p>
            </div>
            <button
              onClick={() => removeFromWishlist(product._id)}
              className="text-red-500 hover:text-red-700 transition"
              aria-label="Remove from wishlist"
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
