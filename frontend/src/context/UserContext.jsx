// src/context/UserContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({
    cart: [],
    wishlist: [],
    addresses: [],
    // Assuming you have a way to get the logged-in user's ID
    // For demonstration, we'll add a placeholder. In a real app,
    // this would come from an authentication context.
    userId: '60c72b2f9b1d8e001c8a4d7d', // Placeholder User ID
    addToCart: () => {},
    addToWishlist: () => {},
    removeFromCart: () => {},
    removeFromWishlist: () => {},
    addAddress: () => {},
    removeAddress: () => {},
    increaseQuantity: () => {},
    decreaseQuantity: () => {},
    clearCart: () => {},
});

export const UserProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const stored = localStorage.getItem('cart');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    const [wishlist, setWishlist] = useState(() => {
        try {
            const stored = localStorage.getItem('wishlist');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    const [addresses, setAddresses] = useState(() => {
        try {
            const stored = localStorage.getItem('addresses');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    // Placeholder for user ID. In a real app, this would be dynamic.
    const [userId, setUserId] = useState('664c1e4f24f8d5573426090e'); // Example User ID, replace with actual user ID from auth

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    useEffect(() => {
        localStorage.setItem('addresses', JSON.stringify(addresses));
    }, [addresses]);

    const addToCart = (product) => {
        const existing = cart.find((item) => item._id === product._id);
        if (existing) {
            increaseQuantity(product._id);
        } else {
            const updatedCart = [...cart, { ...product, quantity: 1 }];
            setCart(updatedCart);
        }
    };

    const increaseQuantity = (productId) => {
        setCart((prev) =>
            prev.map((item) =>
                item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (productId) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item._id === productId && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((item) => item._id !== productId));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    const addToWishlist = (product) => {
        setWishlist((prev) => {
            if (prev.some((p) => p._id === product._id)) return prev;
            return [...prev, product];
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlist((prev) => prev.filter((p) => p._id !== productId));
    };

    const addAddress = (address) => {
        setAddresses((prev) => [...prev, address]);
    };

    const removeAddress = (index) => {
        setAddresses((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <UserContext.Provider
            value={{
                cart,
                wishlist,
                addresses,
                userId, // Provide userId from context
                addToCart,
                addToWishlist,
                removeFromCart,
                removeFromWishlist,
                addAddress,
                removeAddress,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};