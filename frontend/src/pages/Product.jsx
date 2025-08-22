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
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [limit] = useState(20);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = {
                    page,
                    limit,
                    search: searchTerm || undefined,
                    type: typeFilter || undefined,
                    sort: sortOption === 'price-low' ? 'Price' : sortOption === 'price-high' ? '-Price' : '-CreatedAt',
                };
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/all-products`, { params });
                if (res.data.success) {
                    setProducts(res.data.products);
                    setPages(res.data.pages || 1);
                }
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page, limit, searchTerm, typeFilter, sortOption]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        setSearchTerm(searchTermInput);
    };

<<<<<<< HEAD
    const filteredProducts = products.slice();
=======
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
>>>>>>> e771903f7a1856028baf42415d22041b4dd52dfc

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
<<<<<<< HEAD
                    onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
                    className="border p-2 rounded w-full sm:w-1/4"
=======
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="border p-2 rounded w-full sm:w-1/4 text-sm"
>>>>>>> e771903f7a1856028baf42415d22041b4dd52dfc
                >
                    <option value="">All Types</option>
                    <option value="Fresh Produce">Fresh Produce</option>
                    <option value="Seeds & Saplings">Seeds & Saplings</option>
                    <option value="Dry & Raw Produce">Dry & Raw Produce</option>
                    <option value="Farm-Made Products">Farm-Made Products</option>
                </select>

                <select
                    value={sortOption}
<<<<<<< HEAD
                    onChange={(e) => { setSortOption(e.target.value); setPage(1); }}
                    className="border p-2 rounded w-full sm:w-1/4"
=======
                    onChange={(e) => setSortOption(e.target.value)}
                    className="border p-2 rounded w-full sm:w-1/4 text-sm"
>>>>>>> e771903f7a1856028baf42415d22041b4dd52dfc
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

<<<<<<< HEAD
            {loading ? (
                <div className="py-10 text-center text-gray-500">Loading...</div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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
=======
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
>>>>>>> e771903f7a1856028baf42415d22041b4dd52dfc
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex items-center justify-center gap-2 mt-6">
                        <button
                            className="px-3 py-1 border rounded disabled:opacity-50"
                            disabled={page <= 1}
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                        >
                            Prev
                        </button>
                        <span className="text-sm">Page {page} of {pages}</span>
                        <button
                            className="px-3 py-1 border rounded disabled:opacity-50"
                            disabled={page >= pages}
                            onClick={() => setPage((p) => Math.min(pages, p + 1))}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Product;
