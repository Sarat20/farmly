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
        return <div className="text-center p-4">Loading orders...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-600">Error: {error}</div>;
    }

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
                <h2 className="text-2xl font-bold text-gray-700 mb-2">No Orders Yet!</h2>
                <p className="text-gray-500 text-lg mb-4">
                    Looks like you haven't placed any orders.
                </p>
                <a
                    href="/user/products"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                    Start Shopping
                </a>
            </div>
        );
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
            <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order._id} className="border border-gray-200 rounded-lg shadow-sm p-4 bg-white">
                        <div className="flex justify-between items-center mb-3">
                            <p className="font-semibold text-lg">Order ID: {order._id}</p>
                            <p className="text-sm text-gray-500">Placed on: {moment(order.createdAt).format('MMM D, h:mm A')}</p>
                        </div>
                        <p className="text-gray-700 mb-2">Total Amount: ₹{order.totalAmount.toFixed(2)}</p>
                        <p className="text-gray-700 mb-2">
                            Shipping Address: {order.address.line1}, {order.address.city} - {order.address.pincode}
                        </p>
                        <p className="text-gray-700 mb-4">Phone: {order.phone}</p>

                        <h3 className="font-medium mb-2">Items:</h3>
                        <ul className="space-y-2">
                            {order.items.map((item) => (
                                <li key={item._id} className="flex items-center space-x-4 border-t pt-2">
                                    <img
                                        src={item.product?.Image || 'https://via.placeholder.com/64'}
                                        alt={item.product?.Name || 'Product'}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium">{item.product?.Name || 'Unknown Product'}</p>
                                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                                        <p className="text-gray-600">Status: <span className={`font-semibold ${
                                            item.status === 'Delivered' ? 'text-green-600' :
                                            item.status === 'Cancelled' ? 'text-red-600' :
                                            'text-yellow-600'
                                        }`}>{item.status}</span></p>

                                        {(item.status === 'Pending' || item.status === 'Processing') && (
                                            <button
                                                onClick={() => handleCancelOrderItem(order._id, item._id)}
                                                className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
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