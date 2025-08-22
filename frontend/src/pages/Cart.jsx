import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';

const Cart = () => {
    const {
        cart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
    } = useContext(UserContext);

    const navigate = useNavigate();

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.Price * item.quantity,
        0
    );

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
                <FaShoppingCart className="text-6xl text-gray-400 mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-2">
                    Your cart is empty
                </h2>
                <p className="text-gray-500 text-lg mb-4">
                    Add some products to start shopping!
                </p>
                <Link
                    to="/user/products"
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                >
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="p-4 max-w-3xl mx-auto w-full">
            <h2 className="text-2xl font-semibold mb-4 text-center sm:text-left">My Cart</h2>
            <ul className="space-y-4">
                {cart.map((product) => (
                    <li
                        key={product._id}
                        className="flex flex-col sm:flex-row sm:items-center border p-4 rounded-lg shadow-sm gap-4"
                    >
                        <img
                            src={product.Image}
                            alt={product.Name}
                            className="w-full sm:w-24 sm:h-24 h-48 object-cover rounded"
                        />
                        <div className="flex-1 w-full">
                            <h3 className="text-lg font-semibold">{product.Name}</h3>
                            <p className="text-gray-600">₹{product.Price}</p>
                            <div className="flex items-center mt-2 space-x-2">
                                <button
                                    onClick={() => decreaseQuantity(product._id)}
                                    className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                                >
                                    -
                                </button>
                                <span>{product.quantity}</span>
                                <button
                                    onClick={() => increaseQuantity(product._id)}
                                    className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={() => removeFromCart(product._id)}
                            className="text-red-500 hover:text-red-700 transition self-start sm:self-center"
                            aria-label="Remove from cart"
                        >
                            <FaTrash />
                        </button>
                    </li>
                ))}
            </ul>

            <div className="mt-6 text-center sm:text-right">
                <p className="text-xl font-semibold mb-4">Total: ₹{totalPrice}</p>
                <button
                    onClick={() => navigate('/user/checkout')}
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition w-full sm:w-auto"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;
