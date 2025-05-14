import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VendorProducts = () => {
  const [groupedProducts, setGroupedProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('vtoken');

  useEffect(() => {
    const fetchVendorProducts = async () => {
      if (!token) {
        setError("No token found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:4000/api/vendor/my-products', {
          headers: { vtoken: token },
        });

        const products = response.data.products;

        const grouped = products.reduce((acc, product) => {
          const { Type } = product;
          if (!acc[Type]) acc[Type] = [];
          acc[Type].push(product);
          return acc;
        }, {});

        setGroupedProducts(grouped);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError('Unauthorized or token expired. Please log in again.');
        setLoading(false);
      }
    };

    fetchVendorProducts();
  }, [token]);

  if (loading) return <p className="p-4 text-center text-gray-700">Loading your products...</p>;
  if (error) return <p className="p-4 text-center text-red-600">{error}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-green-800">My Products</h1>

      {Object.keys(groupedProducts).length === 0 ? (
        <p className="text-gray-600 text-center">You haven't added any products yet.</p>
      ) : (
        Object.entries(groupedProducts).map(([type, products]) => (
          <div key={type} className="mb-12">
            <h2 className="text-2xl font-semibold text-green-700 mb-4 border-b-2 border-green-300 pb-1">{type}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map(product => (
                <div key={product._id} className="bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-200">
                  <div className="w-80 h-48 overflow-hidden items-center mt-4 ml-5">
                    <img
                      src={product.Image}
                      alt={product.Name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{product.Name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.Description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-green-700 font-bold text-lg">₹{product.Price}</span>
                      <span className="text-sm text-gray-500">Stock: {product.Quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default VendorProducts;
