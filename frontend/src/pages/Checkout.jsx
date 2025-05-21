import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, clearCart, addresses: contextAddresses, addAddress, removeAddress } = useContext(UserContext);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [newAddress, setNewAddress] = useState({ line1: '', city: '', pincode: '' });
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const navigate = useNavigate();

  // Load addresses from context on mount and keep in sync
  useEffect(() => {
    setAddresses(contextAddresses);
  }, [contextAddresses]);

  // Add address both in context and local state
  const handleAddAddress = () => {
    if (!newAddress.line1 || !newAddress.city || !newAddress.pincode) {
      alert('Please fill all address fields');
      return;
    }
    addAddress(newAddress);
    setNewAddress({ line1: '', city: '', pincode: '' });
  };

  // Remove address from context
  const handleDeleteAddress = (index) => {
    removeAddress(index);
    if (selectedAddressIndex === index) {
      setSelectedAddressIndex(null);
    }
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }
    if (selectedAddressIndex === null) {
      alert('Please select an address');
      return;
    }
    if (!phone) {
      alert('Please enter your phone number');
      return;
    }
    const orderAddress = addresses[selectedAddressIndex];

    const newOrder = {
      products: cart.map((item) => ({
        productId: item._id,  // Correct product id
        quantity: item.quantity,
      })),
      address: orderAddress,
      phone,
      paymentMethod,
      createdAt: new Date().toISOString(),
    };

    const prevOrders = JSON.parse(localStorage.getItem('orders')) || [];
    localStorage.setItem('orders', JSON.stringify([newOrder, ...prevOrders]));

    alert('Order Placed Successfully!');
    clearCart();
    navigate('/user/orders');
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>

      <h3 className="font-semibold mb-2">Select Address</h3>
      {addresses.length === 0 && <p>No saved addresses.</p>}
      <ul className="mb-4">
        {addresses.map((addr, i) => (
          <li
            key={i}
            className="mb-2 flex items-center justify-between border p-2 rounded"
          >
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="selectedAddress"
                checked={selectedAddressIndex === i}
                onChange={() => setSelectedAddressIndex(i)}
                className="mr-2"
              />
              <span>{`${addr.line1}, ${addr.city} - ${addr.pincode}`}</span>
            </label>
            <button
              onClick={() => handleDeleteAddress(i)}
              className="text-red-600 hover:text-red-800"
              title="Delete address"
              aria-label="Delete address"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>

      <h3 className="font-semibold mb-2">Add New Address</h3>
      <input
        type="text"
        placeholder="Address line 1"
        value={newAddress.line1}
        onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })}
        className="w-full border p-2 mb-2"
      />
      <input
        type="text"
        placeholder="City"
        value={newAddress.city}
        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
        className="w-full border p-2 mb-2"
      />
      <input
        type="text"
        placeholder="Pincode"
        value={newAddress.pincode}
        onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
        className="w-full border p-2 mb-4"
      />
      <button
        onClick={handleAddAddress}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
      >
        Add Address
      </button>

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border p-2 mb-2"
      />
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="w-full border p-2 mb-4"
      >
        <option value="COD">Cash on Delivery</option>
        <option value="UPI">UPI</option>
        <option value="Card">Card</option>
      </select>
      <button
        onClick={handlePlaceOrder}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Confirm Order
      </button>
    </div>
  );
};

export default Checkout;
