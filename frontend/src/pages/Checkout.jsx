import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cart, clearCart, addresses: contextAddresses, addAddress, removeAddress, userId } = useContext(UserContext);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
    const [newAddress, setNewAddress] = useState({ line1: '', city: '', pincode: '' });
    const [phone, setPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const navigate = useNavigate();


    useEffect(() => {
        setAddresses(contextAddresses);
    }, [contextAddresses]);

    const handleAddAddress = () => {
        if (!newAddress.line1 || !newAddress.city || !newAddress.pincode) {
            alert('Please fill all address fields');
            return;
        }
        addAddress(newAddress);
        setNewAddress({ line1: '', city: '', pincode: '' });
    };

    const handleDeleteAddress = (index) => {
        removeAddress(index);
        if (selectedAddressIndex === index) {
            setSelectedAddressIndex(null);
        }
    };

    const handlePlaceOrder = async () => {
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

        const orderData = {
            userId: userId, 
            items: cart.map((item) => ({
                productId: item._id,
                quantity: item.quantity,
                Price: item.Price, 
            })),
            address: orderAddress,
            phone,
            paymentMethod,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders/place`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            const data = await response.json();

            if (data.success) {
                alert('Order Placed Successfully!');
                clearCart(); 
                navigate('/user/orders'); 
            } else {
                alert(`Order placement failed: ${data.message}`);
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('An error occurred while placing your order. Please try again.');
        }
    };

    const calculateCartTotal = () => {
        return cart.reduce((total, item) => total + (item.Price * item.quantity), 0);
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Checkout</h2>

            <h3 className="font-semibold mb-2">Cart Summary</h3>
            <ul className="mb-4 border p-4 rounded-lg bg-white shadow-sm">
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cart.map((item) => (
                        <li key={item._id} className="flex justify-between items-center mb-1 text-sm">
                            <span>{item.Name} x {item.quantity}</span>
                            <span>₹{(item.Price * item.quantity).toFixed(2)}</span>
                        </li>
                    ))
                )}
                <li className="flex justify-between items-center font-bold mt-2 pt-2 border-t">
                    <span>Total:</span>
                    <span>₹{calculateCartTotal().toFixed(2)}</span>
                </li>
            </ul>

            <h3 className="font-semibold mb-2">Select Address</h3>
            {addresses.length === 0 && <p className="mb-4 text-sm text-gray-600">No saved addresses. Please add one below.</p>}
            <ul className="mb-4">
                {addresses.map((addr, i) => (
                    <li
                        key={i}
                        className="mb-2 flex items-center justify-between border p-3 rounded-lg bg-white"
                    >
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="radio"
                                name="selectedAddress"
                                checked={selectedAddressIndex === i}
                                onChange={() => setSelectedAddressIndex(i)}
                                className="mr-2 accent-green-600"
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
                className="w-full border p-2 mb-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
                type="text"
                placeholder="City"
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                className="w-full border p-2 mb-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
                type="text"
                placeholder="Pincode"
                value={newAddress.pincode}
                onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                className="w-full border p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
                onClick={handleAddAddress}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors mb-6"
            >
                Add Address
            </button>

            <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border p-2 mb-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full border p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
                <option value="COD">Cash on Delivery</option>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
            </select>
            <button
                onClick={handlePlaceOrder}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
                Confirm Order
            </button>
        </div>
    );
};

export default Checkout;