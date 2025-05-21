// src/pages/VendorDashboard.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const productTypes = [
    { name: "Fresh Produce", emoji: "🥦", color: "bg-green-100" },
    { name: "Seeds & Saplings", emoji: "🌱", color: "bg-lime-100" },
    { name: "Dry & Raw Produce", emoji: "🥥", color: "bg-yellow-100" },
    { name: "Farm-Made Products", emoji: "🧴", color: "bg-orange-100" },
];

const VendorDashboard = () => {
    const navigate = useNavigate();
    const [vendorName, setVendorName] = useState('');
    const [farmName, setFarmName] = useState('');
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [productsByCategory, setProductsByCategory] = useState({}); // Stores products grouped by category
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setIsLoading(true);
                const vtoken = localStorage.getItem('vtoken');

                if (!vtoken) {
                    setError('Authentication token not found. Please log in.');
                    setIsLoading(false);
                    navigate('/vendor/login');
                    return;
                }

                const fetches = [
                    fetch('http://localhost:4000/api/vendor/profile', { headers: { 'vtoken': vtoken } }),
                    fetch('http://localhost:4000/api/vendor/my-products', { headers: { 'vtoken': vtoken } }),
                    fetch('http://localhost:4000/api/vendor/payments', { headers: { 'vtoken': vtoken } }),
                    fetch('http://localhost:4000/api/vendor/order-count', { headers: { 'vtoken': vtoken } })
                ];

                const [profileRes, productsRes, paymentsRes, orderCountRes] = await Promise.all(fetches);

                // Handle Profile Data
                if (profileRes.ok) {
                    const profileData = await profileRes.json();
                    if (profileData.success && profileData.vendor) {
                        setVendorName(profileData.vendor.Name);
                        setFarmName(profileData.vendor.Farmname);
                    } else {
                        console.error('Failed to fetch vendor profile:', profileData.message);
                    }
                } else {
                    console.error('Failed to fetch vendor profile:', profileRes.statusText);
                }

                // Handle Products Data
                if (productsRes.ok) {
                    const productsData = await productsRes.json();
                    if (productsData.success) {
                        setTotalProducts(productsData.products.length);

                        // FIX APPLIED HERE: Changed product.Category to product.Type
                        const groupedProducts = productsData.products.reduce((acc, product) => {
                            const category = product.Type || 'Other'; // *** HERE'S THE CHANGE ***
                            if (!acc.hasOwnProperty(category)) {
                                acc[category] = [];
                            }
                            acc[category].push(product);
                            return acc;
                        }, {});
                        setProductsByCategory(groupedProducts);

                    } else {
                        console.error('Failed to fetch vendor products:', productsData.message);
                    }
                } else {
                    console.error('Failed to fetch vendor products:', productsRes.statusText);
                }

                // Handle Payments Data (for earnings)
                if (paymentsRes.ok) {
                    const paymentsData = await paymentsRes.json();
                    if (paymentsData.success && paymentsData.summary) {
                        setTotalEarnings(paymentsData.summary.totalEarnings);
                    } else {
                        console.error('Failed to fetch vendor payments:', paymentsData.message);
                    }
                } else {
                    console.error('Failed to fetch vendor payments:', paymentsRes.statusText);
                }

                // Handle Order Count Data
                if (orderCountRes.ok) {
                    const orderCountData = await orderCountRes.json();
                    if (orderCountData.success) {
                        setTotalOrders(orderCountData.totalOrders);
                    } else {
                        console.error('Failed to fetch order count:', orderCountData.message);
                    }
                } else {
                    console.error('Failed to fetch order count:', orderCountRes.statusText);
                }

            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError('Failed to load dashboard data. Please ensure your backend server is running and accessible.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, [navigate]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-700">
                Loading dashboard data...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-red-50 text-red-700 font-medium p-4 rounded-md shadow-md">
                Error: {error}
            </div>
        );
    }

    // Determine which products to show as "Recent Products"
    // Assuming 'CreatedAt' field exists and is a valid date string from MongoDB
    const allProducts = Object.values(productsByCategory).flat().sort((a, b) => {
        const dateA = new Date(a.CreatedAt);
        const dateB = new Date(b.CreatedAt);
        return dateB - dateA; // Sort descending (most recent first)
    });
    const recentProducts = allProducts.slice(0, 2);

    return (
        <div className="flex">
            {/* Main content area */}
            <div className="flex-1 p-4 bg-gray-100 min-h-screen">
                <h1 className="text-xl font-bold mb-4 text-gray-800">Welcome, {vendorName} from {farmName}</h1>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    <div className="bg-white p-3 rounded shadow">
                        <h2 className="text-base font-semibold text-gray-700">Total Products</h2>
                        <p className="text-lg text-green-600 font-bold">{totalProducts}</p>
                    </div>
                    <div className="bg-white p-3 rounded shadow">
                        <h2 className="text-base font-semibold text-gray-700">Total Orders</h2>
                        <p className="text-lg text-blue-600 font-bold">{totalOrders}</p>
                    </div>
                    <div className="bg-white p-3 rounded shadow">
                        <h2 className="text-base font-semibold text-gray-700">Earnings</h2>
                        <p className="text-lg text-yellow-600 font-bold">₹{totalEarnings.toFixed(2)}</p>
                    </div>
                </div>

                {/* Recent Products */}
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold text-gray-800">Recent Products</h2>
                    <button
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                        onClick={() => navigate('/vendor/dashboard/add-product')}
                    >
                        Add New Product
                    </button>
                </div>

                {recentProducts.length === 0 ? (
                    <p className="bg-gray-50 p-3 rounded shadow text-gray-600 italic text-sm">
                        No recent products to display. Add some!
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        {recentProducts.map((product) => (
                            <div key={product._id} className="bg-white p-3 rounded shadow flex items-center space-x-3">
                                {product.Image && (
                                    <img
                                        src={product.Image}
                                        alt={product.Name}
                                        className="w-10 h-10 object-cover rounded-md"
                                    />
                                )}
                                <div>
                                    <h3 className="font-semibold text-gray-900">{product.Name}</h3>
                                    <p className="text-sm text-gray-700">₹{product.Price}/{product.QuantityUnit} · {product.Quantity}{product.QuantityUnit} available</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Product Types with corresponding product names */}
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Product Types</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {productTypes.map((type, i) => {
                        const productsInType = productsByCategory.hasOwnProperty(type.name) ? productsByCategory[type.name] : [];
                        const displayedProducts = productsInType.slice(0, 3); // Show up to 3 product names

                        return (
                            <div key={i} className={`p-3 rounded shadow text-sm text-gray-800 ${type.color} flex flex-col`}>
                                <div className="flex items-center mb-2">
                                    <div className="text-xl mr-2">{type.emoji}</div>
                                    <div className="font-semibold">{type.name} ({productsInType.length})</div>
                                </div>

                                {productsInType.length === 0 ? (
                                    <p className="text-xs text-gray-600 italic">No products yet</p>
                                ) : (
                                    <ul className="list-disc list-inside text-xs text-gray-700 space-y-0.5 mb-2">
                                        {displayedProducts.map((product) => (
                                            <li key={product._id} className="truncate">
                                                {product.Name}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {productsInType.length > 3 && (
                                    <button
                                        className="mt-auto text-blue-600 hover:text-blue-800 text-xs font-medium underline self-start"
                                        onClick={() => navigate(`/vendor/dashboard/products?category=${type.name}`)}
                                    >
                                        View All ({productsInType.length})
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default VendorDashboard;