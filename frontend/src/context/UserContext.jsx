import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({
  cart: [],
  wishlist: [],
  addresses: [],
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
  // Load cart from localStorage safely
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Load wishlist from localStorage safely
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem('wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Load addresses from localStorage safely
  const [addresses, setAddresses] = useState(() => {
    try {
      const stored = localStorage.getItem('addresses');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync addresses to localStorage
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
