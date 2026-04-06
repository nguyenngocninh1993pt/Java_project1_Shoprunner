import React, { useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";

const AdminOrders = () => {
  // Giả lập dữ liệu mảng các đơn hàng lấy từ Backend/LocalStorage dựa theo cấu trúc Checkout.jsx
  const [orders, setOrders] = useState([
    {
      id: "ORD-1001",
      customer: { name: "Nguyễn Văn A", email: "a@gmail.com", phone: "0901234567", address: "123 Lê Lợi", city: "TP.HCM" },
      items: [{ name: "Giày chạy bộ Nike Air", quantity: 1, price: 2500000 }],
      total: 2500000,
      paymentMethod: "cod",
      date: "06/04/2026 14:30:00",
      status: "Chờ xác nhận",
    },
    {
      id: "ORD-1002",
      customer: { name: "Trần Thị B", email: "b@gmail.com", phone: "0987654321", address: "45 Ba Đình", city: "Hà Nội" },
      items: [{ name: "Áo thun thể thao", quantity: 2, price: 300000 }],
      total: 600000,
      paymentMethod: "bank",
      date: "05/04/2026 09:15:00",
      status: "Đang giao hàng",
    }
  ]);

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Quản lý Đơn hàng</h2>
      <div style={{ background: "#1a1a1a", borderRadius: "12px", border: "1px solid #333", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", color: "#fff" }}>
          <thead style={{ background: "#222", borderBottom: "1px solid #333" }}>
            <tr>
              <th style={{ padding: "15px" }}>Mã ĐH</th>
              <th style={{ padding: "15px" }}>Khách hàng</th>
              <th style={{ padding: "15px" }}>Sản phẩm</th>
              <th style={{ padding: "15px" }}>Tổng tiền</th>
              <th style={{ padding: "15px" }}>Tình trạng</th>
              <th style={{ padding: "15px" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} style={{ borderBottom: "1px solid #333" }}>
                <td style={{ padding: "15px", fontWeight: "bold" }}>{order.id}</td>
                <td style={{ padding: "15px" }}>
                  <div>{order.customer.name}</div>
                  <div style={{ fontSize: "0.85rem", color: "#a3a3a3" }}>{order.customer.phone}</div>
                </td>
                <td style={{ padding: "15px", fontSize: "0.85rem", color: "#a3a3a3" }}>
                  {order.items.map((item, idx) => (
                    <div key={idx}>{item.quantity}x {item.name}</div>
                  ))}
                </td>
                <td style={{ padding: "15px", color: "#4ade80", fontWeight: "bold" }}>
                  {order.total.toLocaleString()} ₫
                </td>
                <td style={{ padding: "15px" }}>
                  <select 
                    value={order.status} 
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    style={{ background: "#333", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "6px" }}
                  >
                    <option value="Chờ xác nhận">Chờ xác nhận</option>
                    <option value="Đang giao hàng">Đang giao hàng</option>
                    <option value="Hoàn thành">Hoàn thành</option>
                    <option value="Đã hủy">Đã hủy</option>
                  </select>
                </td>
                <td style={{ padding: "15px", display: "flex", gap: "10px" }}>
                  <button style={{ background: "transparent", color: "#3b82f6", border: "none", cursor: "pointer" }}><Eye size={18} /></button>
                  <button style={{ background: "transparent", color: "#ef4444", border: "none", cursor: "pointer" }}><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;