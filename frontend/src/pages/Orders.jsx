import React, { useEffect, useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const localOrders = JSON.parse(localStorage.getItem('orders')) || [];
      setOrders(Array.isArray(localOrders) ? localOrders : []);
    } catch (err) {
      console.error('Error parsing orders from localStorage', err);
      setOrders([]);
    }
  }, []);

  const handleCancelOrder = (index) => {
    const updatedOrders = [...orders];
    updatedOrders.splice(index, 1);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  };

  if (!orders.length) return <p className="p-4">You have no orders.</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
      <ul className="space-y-4">
        {orders.map((order, index) => (
          <li key={index} className="border p-4 rounded-lg shadow-sm">
            <p className="font-medium mb-2">
              Delivery to:{' '}
              {order.address
                ? `${order.address.line1 || ''}, ${order.address.city || ''} - ${order.address.pincode || ''}`
                : 'No address provided'}
            </p>
            <p className="text-sm text-gray-500 mb-1">Phone: {order.phone || 'N/A'}</p>
            <p className="text-sm text-gray-500 mb-2">Payment: {order.paymentMethod || 'N/A'}</p>
            <ul className="space-y-1 text-sm text-gray-700 mb-2">
              {(order.products || []).map((prod, i) => (
                <li key={i}>
                  {prod.productId?.Name || 'Unnamed Product'} - Qty: {prod.quantity}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleCancelOrder(index)}
              className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600"
            >
              Cancel Order
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
