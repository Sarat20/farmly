// src/pages/VendorOrder.jsx (No changes needed if you used my previous version)
import React, { useState, useEffect } from 'react';
import moment from 'moment'; // For formatting dates

const VendorOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchVendorOrders = async () => {
        const vtoken = localStorage.getItem('vtoken'); // Get the vendor's token

        if (!vtoken) {
            setError('No vendor token found. Please log in as a vendor.');
            setLoading(false);
            console.error("Vendor token is missing. Aborting order fetch.");
            return;
        }

        try {
            setLoading(true);
            // API URL is now simply /api/orders/vendor
            const apiUrl = `http://localhost:4000/api/orders/vendor`; 
            console.log("Attempting to fetch orders from:", apiUrl);

            const headers = {
                'Content-Type': 'application/json',
                // Using 'vtoken' header as per your authVendor middleware
                'vtoken': vtoken, 
            };

            const response = await fetch(apiUrl, { headers });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: response.statusText }));
                throw new Error(`HTTP error! status: ${response.status}, Message: ${errorData.message}`);
            }
            const data = await response.json();
            if (data.success) {
                setOrders(data.orders);
                console.log("Orders fetched successfully:", data.orders);
            } else {
                setError(data.message || 'Failed to fetch vendor orders.');
                console.error("Backend reported failure:", data.message);
            }
        } catch (err) {
            console.error('Error in fetchVendorOrders:', err);
            setError('Failed to load vendor orders. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVendorOrders();
    }, []); // Empty dependency array: runs only once on mount

    const handleStatusChange = async (orderId, itemId, newStatus) => {
        const orderToUpdate = orders.find(o => o._id === orderId);
        const itemToUpdate = orderToUpdate?.items.find(i => i._id === itemId);

        if (itemToUpdate && (itemToUpdate.status === 'Delivered' || itemToUpdate.status === 'Cancelled')) {
            alert(`Cannot change status for an item that is already ${itemToUpdate.status}.`);
            return;
        }

        const vtoken = localStorage.getItem('vtoken'); // Get the vendor's token
        if (!vtoken) {
            alert('Authentication token missing. Please log in again.');
            return;
        }

        try {
            const headers = {
                'Content-Type': 'application/json',
                // Using 'vtoken' header as per your authVendor middleware
                'vtoken': vtoken, 
            };

            const response = await fetch(`http://localhost:4000/api/orders/${orderId}/items/${itemId}`, {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await response.json();

            if (data.success) {
                alert('Order item status updated successfully!');
                fetchVendorOrders(); // Re-fetch orders to show updated status
            } else {
                alert(`Failed to update status: ${data.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error updating order item status:', error);
            alert('An error occurred while updating the status. Please try again.');
        }
    };

    if (loading) {
        return <div className="text-center p-4">Loading vendor orders...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-600">Error: {error}</div>;
    }

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
                <h2 className="text-2xl font-bold text-gray-700 mb-2">No Orders for You Yet!</h2>
                <p className="text-gray-500 text-lg mb-4">
                    Customers will place orders soon.
                </p>
                <p className="text-sm text-gray-400">
                    (If you just deleted an order, try placing a new one to test.)
                </p>
            </div>
        );
    }

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Your Vendor Orders</h2>
            <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order._id} className="border border-gray-200 rounded-lg shadow-sm p-4 bg-white">
                        <div className="flex justify-between items-center mb-3">
                            <p className="font-semibold text-lg">Order ID: {order._id}</p>
                            <p className="text-sm text-gray-500">Placed by: {order.user?.name || 'Unknown User'}</p>
                            <p className="text-sm text-gray-500">Placed on: {moment(order.createdAt).format('MMM D, h:mm A')}</p>
                        </div>
                        <p className="text-gray-700 mb-2">Total Order Amount: ₹{order.totalAmount.toFixed(2)}</p>
                        <p className="text-gray-700 mb-2">Shipping Address: {order.address?.line1 || ''}, {order.address?.city || ''} - {order.address?.pincode || ''}</p>
                        <p className="text-gray-700 mb-4">Phone: {order.phone}</p>

                        <h3 className="font-medium mb-2">Your Items in this Order:</h3>
                        <ul className="space-y-3">
                            {order.items.map((item) => (
                                <li key={item._id} className="flex items-center space-x-4 border-t pt-3">
                                    <img
                                        src={item.product?.Image || 'https://via.placeholder.com/80'}
                                        alt={item.product?.Name || 'Product'}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium">{item.product?.Name || 'Unknown Product'}</p>
                                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                                        <div className="flex items-center mt-1">
                                            <span className="text-gray-600 mr-2">Status:</span>
                                            <select
                                                value={item.status}
                                                onChange={(e) => handleStatusChange(order._id, item._id, e.target.value)}
                                                className={`p-1 rounded border ${
                                                    item.status === 'Delivered' ? 'bg-green-100 text-green-800 border-green-300' :
                                                    item.status === 'Cancelled' ? 'bg-red-100 text-red-800 border-red-300' :
                                                    'bg-yellow-100 text-yellow-800 border-yellow-800' // Corrected for yellow
                                                }`}
                                                disabled={item.status === 'Delivered' || item.status === 'Cancelled'}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VendorOrder;