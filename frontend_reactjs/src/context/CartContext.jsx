import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  // =========================
  // FETCH CART
  // =========================
  const fetchCart = async () => {
    try {
      const sessionId = localStorage.getItem("sessionId");

      const res = await fetch(
        `http://localhost:8080/api/v1/cart?sessionId=${sessionId || ""}`,
        {
          headers: {
            ...(sessionId && { "X-Session-Id": sessionId }),
          },
        },
      );

      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // ADD TO CART
  // =========================
  const addToCart = async (product, quantity = 1) => {
    try {
      const sessionId = localStorage.getItem("sessionId");

      const payload = {
        productId: product.id,
        productVariantId: product.variantId,
        quantity,
        sessionId: sessionId || null,
      };

      const res = await fetch("http://localhost:8080/api/v1/cart/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(sessionId && { "X-Session-Id": sessionId }),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      // lưu sessionId nếu backend trả về
      const newSessionId = res.headers.get("X-Session-Id");
      if (newSessionId) {
        localStorage.setItem("sessionId", newSessionId);
      }

      setCart(data);
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // UPDATE ITEM
  // =========================
  const updateQuantity = async (cartItemId, quantity) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/cart/items/${cartItemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity }),
        },
      );

      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // REMOVE ITEM
  // =========================
  const removeFromCart = async (cartItemId) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/cart/items/${cartItemId}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error(err);
    }
  };

  const clearCart = () => setCart(null);

  return (
    <CartContext.Provider
      value={{
        cart,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
