// src/pages/Product.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch, FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [searchTermInput, setSearchTermInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/products/all-products');
        if (res.data.success) {
          setProducts(
            res.data.products.map((p) => ({
              ...p,
              Rating: Math.floor(Math.random() * 3) + 3, // static 3–5 stars
            }))
          );
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchTermInput);
  };

  const handleAddToCart = (productId) => {
    // TODO: Replace this stub with real add-to-cart logic
    console.log(`Add to Cart clicked for product ID: ${productId}`);
  };

  const handleAddToWishlist = (productId) => {
    // TODO: Replace this stub with real add-to-wishlist logic
    console.log(`Add to Wishlist clicked for product ID: ${productId}`);
  };

  const filteredProducts = products
    .filter((product) =>
      product.Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (typeFilter === '' || product.Type === typeFilter)
    )
    .sort((a, b) => {
      if (sortOption === 'price-low') return a.Price - b.Price;
      if (sortOption === 'price-high') return b.Price - a.Price;
      if (sortOption === 'rating-high') return b.Rating - a.Rating;
      return 0;
    });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">All Products</h2>

      {/* Search / Filter / Sort Form */}
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-4 items-center">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTermInput}
            onChange={(e) => setSearchTermInput(e.target.value)}
            className="border p-2 pr-10 rounded w-full"
          />
          <FaSearch
            onClick={handleSearch}
            className="absolute right-3 top-3 text-gray-500 cursor-pointer"
          />
        </div>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/4"
        >
          <option value="">All Types</option>
          <option value="Fresh Produce">Fresh Produce</option>
          <option value="Seeds & Saplings">Seeds & Saplings</option>
          <option value="Dry & Raw Produce">Dry & Raw Produce</option>
          <option value="Farm-Made Products">Farm-Made Products</option>
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/4"
        >
          <option value="">Sort By</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating-high">Rating: High to Low</option>
        </select>
      </form>

      {/* Show current filter heading */}
      {typeFilter ? (
        <h3 className="text-lg font-semibold mb-3">Showing: {typeFilter}</h3>
      ) : (
        <h3 className="text-lg font-semibold mb-3">Showing: All Products</h3>
      )}

      {/* Product Grid: 4 per row on md+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="relative border p-2 rounded-lg shadow-sm text-xs hover:shadow-md transition-shadow duration-200"
          >
            {/* Wish & Cart icons in top-right corner */}
            <div className="absolute top-2 right-2 flex space-x-2">
              <button
                onClick={() => handleAddToWishlist(product._id)}
                className="text-red-500 hover:text-red-700 transition-colors"
                aria-label="Add to Wishlist"
              >
                <FaHeart size={16} />
              </button>
              <button
                onClick={() => handleAddToCart(product._id)}
                className="text-green-600 hover:text-green-800 transition-colors"
                aria-label="Add to Cart"
              >
                <FaShoppingCart size={16} />
              </button>
            </div>

            <Link to={`/user/products/${product._id}`}>
              <img
                src={product.Image}
                alt={product.Name}
                className="h-32 w-full object-cover mb-2 rounded"
              />
              <h3 className="text-sm font-semibold">{product.Name}</h3>
              <p className="text-gray-600">{product.Type}</p>
              <p className="text-gray-800 font-medium mt-1">₹{product.Price}</p>
              <p className="text-gray-500">Qty: {product.Quantity}</p>
              <div className="flex items-center gap-1 mt-1 text-yellow-500">
                {[...Array(product.Rating)].map((_, i) => (
                  <FaStar key={i} size={12} />
                ))}
                <span className="text-gray-700 text-xs ml-1">({product.Rating})</span>
              </div>
              <p className="text-xs mt-2">Vendor: {product?.Vendor?.Name || 'Unknown'}</p>
              <p className="text-xs">Farm: {product?.Vendor?.Farmname || 'Unknown'}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
