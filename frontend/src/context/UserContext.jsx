// src/context/UserContext.jsx
import React, { createContext, useState } from 'react';

export const UserContext = createContext({
  cart: [],
  wishlist: [],
  addToCart: () => {},
  addToWishlist: () => {},
  removeFromCart: () => {},
  removeFromWishlist: () => {},
});

export const UserProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      if (prev.some((p) => p._id === product._id)) return prev;
      return [...prev, product];
    });
  };

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.some((p) => p._id === product._id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((p) => p._id !== productId));
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((p) => p._id !== productId));
  };

  return (
    <UserContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        addToWishlist,
        removeFromCart,
        removeFromWishlist,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
