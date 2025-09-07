'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Create the cart context
const CartContext = createContext();

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

// Cart provider component
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCartItems(Array.isArray(parsedCart) ? parsedCart : []);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        setCartItems([]);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  // Add item to cart (for regular "Add to Cart" functionality)
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item._id === product._id,
      );

      if (existingItemIndex !== -1) {
        // Update quantity if item exists - ADD to existing quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item if it doesn't exist
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Set item in cart (for "Buy Now" functionality - replaces quantity instead of adding)
  const setItemInCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item._id === product._id,
      );

      if (existingItemIndex !== -1) {
        // Update quantity if item exists - SET the exact quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity = quantity;
        return updatedItems;
      } else {
        // Add new item if it doesn't exist
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Add or update item in cart (combines both functionalities)
  const addOrUpdateCart = (product, quantity = 1, replace = false) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item._id === product._id,
      );

      if (existingItemIndex !== -1) {
        // Update quantity based on replace flag
        const updatedItems = [...prevItems];
        if (replace) {
          // Replace quantity (for Buy Now)
          updatedItems[existingItemIndex].quantity = quantity;
        } else {
          // Add to existing quantity (for Add to Cart)
          updatedItems[existingItemIndex].quantity += quantity;
        }
        return updatedItems;
      } else {
        // Add new item if it doesn't exist
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== productId),
    );
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item,
      ),
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Get specific item from cart
  const getCartItem = (productId) => {
    return cartItems.find((item) => item._id === productId);
  };

  // Check if item is in cart
  const isInCart = (productId) => {
    return cartItems.some((item) => item._id === productId);
  };

  // Calculate cart totals
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = typeof item.price === 'number' ? item.price : 0;
      const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
      return total + price * quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => {
      const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
      return count + quantity;
    }, 0);
  };

  // Context value
  const value = {
    cartItems,
    addToCart,
    setItemInCart,
    addOrUpdateCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    getCartItem,
    isInCart,
    isLoaded,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
