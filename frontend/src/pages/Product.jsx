import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa'; 
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
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/all-products`);
                if (res.data.success) {
                    setProducts(res.data.products);
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

    const filteredProducts = products
        .filter((product) =>
            product.Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (typeFilter === '' || product.Type === typeFilter)
        )
        .sort((a, b) => {
            if (sortOption === 'price-low') return a.Price - b.Price;
            if (sortOption === 'price-high') return b.Price - a.Price;
            return 0;
        });

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4 text-center sm:text-left">All Products</h2>

            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-4 w-full">
                <div className="relative w-full sm:w-1/2">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTermInput}
                        onChange={(e) => setSearchTermInput(e.target.value)}
                        className="border p-2 pr-10 rounded w-full text-sm"
                    />
                    <FaSearch
                        onClick={handleSearch}
                        className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                    />
                </div>

                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="border p-2 rounded w-full sm:w-1/4 text-sm"
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
                    className="border p-2 rounded w-full sm:w-1/4 text-sm"
                >
                    <option value="">Sort By</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                </select>
            </form>

            {typeFilter ? (
                <h3 className="text-lg font-semibold mb-3 text-center sm:text-left">Showing: {typeFilter}</h3>
            ) : (
                <h3 className="text-lg font-semibold mb-3 text-center sm:text-left">Showing: All Products</h3>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                    <div
                        key={product._id}
                        className="relative border p-2 rounded-lg shadow-sm text-xs hover:shadow-md transition-shadow duration-200"
                    >
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
