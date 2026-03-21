import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Checkout = () => {
  const { cartItems, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postal: "",
    paymentMethod: "cod",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, address, city, postal, paymentMethod } = form;

    if (!name || !email || !phone || !address || !city || !postal || !paymentMethod) {
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const order = {
      customer: { name, email, phone, address, city, postal },
      items: cartItems,
      total: totalPrice,
      paymentMethod,
      date: new Date().toLocaleString(),
    };

    toast.success(`Thanh toán thành công bằng phương thức: ${paymentMethod.toUpperCase()}`);
    navigate("/order-success", { state: { order } });
    clearCart();
  };

  if (cartItems.length === 0)
    return (
      <div className="cart-empty">
        <p>Giỏ hàng trống.</p>
        <button className="btn" onClick={() => navigate("/products")}>Quay lại cửa hàng</button>
      </div>
    );

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="section-title">Thanh toán</h1>
        <div className="checkout-grid">
          {/* Form khách hàng */}
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h2>Thông tin khách hàng</h2>
            <div className="form-grid">
              {["name","email","phone","address","city","postal"].map((field,idx) => (
                <input
                  key={idx}
                  type={field==="email"?"email":"text"}
                  placeholder={
                    field==="name"?"Họ và tên":
                    field==="email"?"Email":
                    field==="phone"?"Số điện thoại":
                    field==="address"?"Địa chỉ":
                    field==="city"?"Thành phố / Tỉnh":"Mã bưu điện"
                  }
                  value={form[field]}
                  onChange={(e)=>setForm({...form,[field]:e.target.value})}
                  className="form-input"
                />
              ))}
            </div>

            <div className="payment-methods">
              <h3>Phương thức thanh toán</h3>
              <div className="payment-grid">
                {[
                  {id:"cod",label:"COD"},
                  {id:"bank",label:"Chuyển khoản ngân hàng"},
                  {id:"card",label:"Thẻ tín dụng / Thẻ ghi nợ"}
                ].map((m)=>
                  <div
                    key={m.id}
                    className={`payment-card ${form.paymentMethod===m.id?"active":""}`}
                    onClick={()=>setForm({...form,paymentMethod:m.id})}
                  >
                    {m.label}
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className="btn mt-4">Thanh toán</button>
          </form>

          {/* Chi tiết đơn hàng */}
          <div className="order-summary">
            <h2>Đơn hàng của bạn</h2>
            <div className="order-items">
              {cartItems.map((item,idx)=>(
                <div key={item.id} className="order-item">
                  <div className="order-left">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <p>{item.name}</p>
                      <p>{item.quantity} x {item.price.toLocaleString()} ₫</p>
                    </div>
                  </div>
                  <p className="order-price">{(item.price*item.quantity).toLocaleString()} ₫</p>
                </div>
              ))}
            </div>
            <div className="order-total">
              <h3>Tổng tiền:</h3>
              <p>{totalPrice.toLocaleString()} ₫</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
