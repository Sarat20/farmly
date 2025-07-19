import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { FaHeart } from "react-icons/fa";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(UserContext);
  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
        <FaHeart className="text-6xl text-gray-400 mb-4" />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-2">
          Your wishlist is empty
        </h2>
        <p className="text-gray-500 text-lg mb-4">
          Add your favorite products to view them later!
        </p>
        <Link
          to="/user/products"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto w-full">
      <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">My Wishlist</h2>
      <ul className="space-y-4">
        {wishlist.map((product) => (
          <li
            key={product._id}
            className="flex flex-col md:flex-row items-center md:items-start border p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            {/* Clickable product area */}
            <div
              className="flex flex-col md:flex-row items-center flex-1 w-full md:w-auto mb-4 md:mb-0"
              onClick={() => navigate(`/user/products/${product._id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") navigate(`/user/products/${product._id}`);
              }}
            >
              <img
                src={product.Image}
                alt={product.Name}
                className="w-24 h-24 object-cover rounded mb-2 md:mb-0 md:mr-4"
              />
              <div className="text-center md:text-left">
                <h3 className="text-lg font-semibold">{product.Name}</h3>
                <p className="text-gray-600">₹{product.Price}</p>
              </div>
            </div>

            {/* Remove from wishlist button */}
            <button
              onClick={() => removeFromWishlist(product._id)}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 w-full md:w-auto"
              aria-label={`Remove ${product.Name} from wishlist`}
              title="Remove from wishlist"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
