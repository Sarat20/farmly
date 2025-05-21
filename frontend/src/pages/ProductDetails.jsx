// src/pages/ProductDetails.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { UserContext } from '../context/UserContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart, addToWishlist } = useContext(UserContext);

  const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/products/${id}`);
        if (res.data.success) {
          setProduct({
            ...res.data.product,
            Rating: Math.floor(Math.random() * 3) + 3, // Random rating 3-5
          });
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error('Failed to fetch product details:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 2000);
  };

  const handleAddToCart = () => {
    addToCart(product);
    showNotification('Added to Cart!');
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    showNotification('Added to Wishlist!');
  };

  // ✅ Proper loading and error handling
  if (loading) return <p className="p-4">Loading product...</p>;
  if (!product) return <p className="p-4">Product not found.</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {notification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-100 text-blue-800 px-4 py-2 rounded shadow-lg">
          {notification}
        </div>
      )}

      <Link to="/user/products" className="text-blue-600 underline mb-4 inline-block">
        &larr; Back to Products
      </Link>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.Image}
          alt={product.Name}
          className="w-full md:w-1/2 h-auto object-cover rounded mb-4 md:mb-0"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{product.Name}</h1>
          <p className="text-gray-600 mb-1">Type: {product.Type}</p>
          <p className="text-gray-900 text-xl font-semibold mb-2">₹{product.Price}</p>
          <p className="text-gray-600 mb-2">Quantity Available: {product.Quantity}</p>

          <div className="flex items-center gap-1 text-yellow-500 mb-2">
            {[...Array(product.Rating)].map((_, i) => (
              <FaStar key={i} />
            ))}
            <span className="text-gray-700 ml-1">({product.Rating})</span>
          </div>

          <p className="text-sm text-gray-700 mb-1">
            Vendor: {product?.Vendor?.Name || 'Unknown'}
          </p>
          <p className="text-sm text-gray-700 mb-4">
            Farm: {product?.Vendor?.Farmname || 'Unknown'}
          </p>
          <p className="text-gray-800 mb-4">{product.Description || 'No description available.'}</p>

          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </button>
            <button
              onClick={handleAddToWishlist}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              <FaHeart className="mr-2" />
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
