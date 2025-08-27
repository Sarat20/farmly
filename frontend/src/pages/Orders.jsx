import React, { useState, useEffect, useContext, useCallback } from 'react'; // Import useCallback
import { UserContext } from '../context/UserContext';
import moment from 'moment';

const UserOrders = () => {
    const { userId } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   
    const fetchOrders = useCallback(async () => {
        if (!userId) {
            setError('User not logged in or user ID not available.');
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/user/${userId}`);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: response.statusText }));
                throw new Error(`HTTP error! status: ${response.status}, Message: ${errorData.message}`);
            }
            const data = await response.json();
            if (data.success) {
                setOrders(data.orders);
            } else {
                setError(data.message || 'Failed to fetch orders.');
            }
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Failed to load your orders. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]); 

    const handleCancelOrderItem = async (orderId, itemId) => {
        if (!window.confirm('Are you sure you want to cancel this item?')) {
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}/items/${itemId}/cancel`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userId }), 
            });

            const data = await response.json();

            if (data.success) {
                alert('Order item cancelled successfully!');
                fetchOrders(); 
            } else {
                alert(`Cancellation failed: ${data.message}`);
            }
        } catch (error) {
            console.error('Error cancelling order item:', error);
            alert('An error occurred while cancelling the item. Please try again.');
        }
    };

    if (loading) {
        return <div className="text-center p-6">Loading orders...</div>;
    }

    if (error) {
        return <div className="text-center p-6 text-red-600">Error: {error}</div>;
    }

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">No Orders Yet</h2>
                <p className="text-gray-600 text-base sm:text-lg mb-4 max-w-md">Looks like you haven't placed any orders. Explore our products and start your journey with Farmly!</p>
                <a
                    href="/user/products"
                    className="inline-flex items-center justify-center bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Start Shopping
                </a>
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">Your Orders</h2>
            <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order._id} className="border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6 bg-white">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-3">
                            <p className="font-semibold text-base sm:text-lg break-all">Order ID: {order._id}</p>
                            <p className="text-xs sm:text-sm text-gray-500">Placed on: {moment(order.createdAt).format('MMM D, h:mm A')}</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-2 sm:gap-4 text-sm sm:text-base mb-4">
                            <p className="text-gray-700">Total Amount: ₹{order.totalAmount.toFixed(2)}</p>
                            <p className="text-gray-700">Phone: {order.phone}</p>
                            <p className="text-gray-700 sm:col-span-2">Shipping: {order.address.line1}, {order.address.city} - {order.address.pincode}</p>
                        </div>

                        <h3 className="font-medium mb-2">Items:</h3>
                        <ul className="space-y-3">
                            {order.items.map((item) => (
                                <li key={item._id} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 border-t pt-3">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <img
                                            src={item.product?.Image || 'https://via.placeholder.com/64'}
                                            alt={item.product?.Name || 'Product'}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div>
                                            <p className="font-medium">{item.product?.Name || 'Unknown Product'}</p>
                                            <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <div className="flex-1 sm:text-right">
                                        <p className="text-gray-600">Status: <span className={`font-semibold ${
                                            item.status === 'Delivered' ? 'text-green-600' :
                                            item.status === 'Cancelled' ? 'text-red-600' :
                                            'text-yellow-600'
                                        }`}>{item.status}</span></p>

                                        {(item.status === 'Pending' || item.status === 'Processing') && (
                                            <button
                                                onClick={() => handleCancelOrderItem(order._id, item._id)}
                                                className="mt-2 px-3 py-1.5 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                                            >
                                                Cancel Item
                                            </button>
                                        )}
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

export default UserOrders;