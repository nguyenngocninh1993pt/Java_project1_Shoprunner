import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import axios from "axios";

const getSessionId = () => {
  let sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const sessionId = getSessionId();

  // Load cart từ backend
  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/cart?sessionId=${sessionId}`
      );
      setCartItems(res.data);
    } catch (err) {
      console.error("Fetch cart error:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Update quantity
  const updateQuantity = async (productId, quantity) => {
    try {
      await axios.put("http://localhost:8080/cart/update", {
        productId,
        quantity,
        sessionId,
      });
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  // Remove item
  const removeFromCart = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:8080/cart/remove/${productId}?sessionId=${sessionId}`
      );
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/cart/clear?sessionId=${sessionId}`
      );
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  // Total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0)
    return (
      <div className="cart-empty">
        <p>Giỏ hàng trống.</p>
        <button className="btn" onClick={() => navigate("/products")}>
          Quay lại cửa hàng
        </button>
      </div>
    );

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="section-title">Giỏ hàng của bạn</h1>

        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-card">
              <img src={item.image} alt={item.name} className="cart-image" />

              <div className="cart-info">
                <h2>{item.name}</h2>
                <p className="category">{item.category}</p>
                <p className="price">{item.price.toLocaleString()} ₫</p>
              </div>

              <div className="cart-quantity">
                <button
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      item.quantity > 1 ? item.quantity - 1 : 1
                    )
                  }
                >
                  <Minus size={16} />
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                className="cart-remove"
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}

          <div className="cart-total">
            <h2>Tổng tiền:</h2>
            <p>{totalPrice.toLocaleString()} ₫</p>
          </div>

          <div className="cart-actions">
            <button className="btn btn-red" onClick={clearCart}>
              Xóa tất cả
            </button>
            <Link to="/checkout" className="btn">
              Thanh toán
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;