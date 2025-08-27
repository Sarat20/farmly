import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { cart, addresses } = useContext(UserContext);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentType, setPaymentType] = useState('COD');
  const [deliveryMethod, setDeliveryMethod] = useState('Standard');
  const navigate = useNavigate();

  const handleOrder = async () => {
    if (!selectedAddress || !phoneNumber || !paymentType || !deliveryMethod) {
      alert('Please fill all fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/orders/place',
        {
          address: selectedAddress,
          phoneNumber,
          paymentType,
          deliveryMethod,
          products: cart.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      console.error(err);
      alert('Failed to place order');
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-3xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4">Place Order</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Phone Number</label>
        <input
          type="tel"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-medium">Select Delivery Address</h3>
        <ul className="space-y-2 mt-2">
          {addresses.map((address, index) => (
            <li key={index}>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="address"
                  value={address}
                  onChange={() => setSelectedAddress(address)}
                  className="accent-green-600"
                />
                <span>{address}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Payment Type</label>
        <select
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="COD">Cash on Delivery</option>
          <option value="Online">Online Payment</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Delivery Method</label>
        <select
          value={deliveryMethod}
          onChange={(e) => setDeliveryMethod(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="Standard">Standard Delivery</option>
          <option value="Express">Express Delivery</option>
        </select>
      </div>

      <button
        className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition-colors"
        onClick={handleOrder}
      >
        Confirm & Place Order
      </button>
    </div>
  );
};

export default PlaceOrder;
