import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa'; 
import { UserContext } from '../context/UserContext';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const { addToCart, addToWishlist } = useContext(UserContext);

    const [notification, setNotification] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`);
                if (res.data.success) {
                    setProduct(res.data.product); 
                } else {
                    setProduct(null);
                }
            } catch (error) {
                console.error('Failed to fetch product details:', error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => {
            setNotification('');
        }, 2000);
    };

    const handleAddToCart = () => {
        addToCart(product);
        showNotification('Added to Cart!');
    };

    const handleAddToWishlist = () => {
        addToWishlist(product);
        showNotification('Added to Wishlist!');
    };

    if (loading) return <p className="p-4">Loading product...</p>;
    if (!product) return <p className="p-4">Product not found.</p>;

    return (
        <div className="p-4 max-w-4xl mx-auto">
            {notification && (
                <div className="fixed top-[70px] left-1/2 transform -translate-x-1/2 bg-blue-100 text-blue-800 px-4 py-2 rounded shadow-lg z-[1000] text-sm md:text-base">
                    {notification}
                </div>
            )}

            <Link to="/user/products" className="text-blue-600 underline mb-4 inline-block text-sm md:text-base">
                &larr; Back to Products
            </Link>

            <div className="flex flex-col md:flex-row gap-6">
                <img
                    src={product.Image}
                    alt={product.Name}
                    className="w-full md:w-1/2 h-auto object-cover rounded mb-4 md:mb-0"
                />

                <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.Name}</h1>
                    <p className="text-gray-600 mb-1 text-sm md:text-base">Type: {product.Type}</p>
                    <p className="text-gray-900 text-lg md:text-xl font-semibold mb-2">₹{product.Price}</p>
                    <p className="text-gray-600 mb-2 text-sm md:text-base">Quantity Available: {product.Quantity}</p>

                    <p className="text-sm text-gray-700 mb-1">
                        Vendor: {product?.Vendor?.Name || 'Unknown'}
                    </p>
                    <p className="text-sm text-gray-700 mb-4">
                        Farm: {product?.Vendor?.Farmname || 'Unknown'}
                    </p>
                    <p className="text-gray-800 mb-4 text-sm md:text-base">{product.Description || 'No description available.'}</p>

                    <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
                        <button
                            onClick={handleAddToCart}
                            className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm md:text-base"
                        >
                            <FaShoppingCart className="mr-2" />
                            Add to Cart
                        </button>
                        <button
                            onClick={handleAddToWishlist}
                            className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm md:text-base"
                        >
                            <FaHeart className="mr-2" />
                            Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
