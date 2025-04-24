import React, { createContext, useContext, useState, useEffect } from "react";

// Create the Cart Context
const CartContext = createContext();

// CartProvider to wrap the app with
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const userToken = localStorage.getItem("userToken");

  // ✅ Add to Cart
  const addToCart = async (productId, quantity) => {
    try {
      const response = await fetch("http://localhost:5000/CartAPI/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          productId, // use the key your backend expects
          quantity: Number(quantity),
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response text:", errorText);
        throw new Error("Failed to add item to cart");
      }
  
      const updatedCart = await response.json();
      
      setCart(updatedCart.cart.items);
      console.log(updatedCart.cart.items)
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  

  // ✅ Update quantity of an item
  const updateCartItem = async (productId, quantity) => {
    try {
      const response = await fetch(`http://localhost:5000/CartAPI/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ 
            productId, 
            quantity:Number(quantity),
         }),
      });

      if (!response.ok) {
        throw new Error('Failed to update cart item');
      }

      const updatedCart = await response.json();
      setCart(updatedCart.cart.items);
      console.log(updatedCart.cart.items);
      // Sync updated cart
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
    

  };

  // ✅ Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/CartAPI/remove/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }

      const updatedCart = await response.json();
      setCart(updatedCart.cart.items);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // ✅ Clear all items from cart
  const clearCart = async () => {
    try {
      const response = await fetch(`http://localhost:5000/CartAPI/clear`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to clear cart');
      }

      setCart([]); // Clear local cart state
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  // ✅ Fetch cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("http://localhost:5000/CartAPI/show", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cart");
        }

        const data = await response.json();
        setCart(data.cart.items);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    if (userToken) {
      fetchCart();
    }
  }, [userToken]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,      
        updateCartItem,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);
