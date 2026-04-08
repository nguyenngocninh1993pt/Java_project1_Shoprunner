import React, { useState } from "react";
import { Eye, Edit, Trash2, Search, X } from "lucide-react";

const AdminOrders = () => {
  // Dữ liệu giả lập
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

  // State cho thanh tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");

  // State cho Modal xác nhận đổi trạng thái
  const [statusModal, setStatusModal] = useState({
    isOpen: false,
    orderId: null,
    currentStatus: "",
    targetStatus: ""
  });

  // Xử lý bộ lọc tìm kiếm
  const filteredOrders = orders.filter(order => {
    const searchLower = searchTerm.toLowerCase();
    return (
      order.id.toLowerCase().includes(searchLower) ||
      order.customer.name.toLowerCase().includes(searchLower) ||
      order.status.toLowerCase().includes(searchLower)
    );
  });

  // Mở modal đổi trạng thái
  const openStatusModal = (order) => {
    setStatusModal({
      isOpen: true,
      orderId: order.id,
      currentStatus: order.status,
      targetStatus: order.status // Mặc định hiển thị lại trạng thái cũ trên Modal
    });
  };

  // Xác nhận lưu trạng thái mới
  const handleConfirmStatusChange = () => {
    setOrders(orders.map(o => 
      o.id === statusModal.orderId ? { ...o, status: statusModal.targetStatus } : o
    ));
    // Đóng modal sau khi lưu
    setStatusModal({ isOpen: false, orderId: null, currentStatus: "", targetStatus: "" });
  };

  // Hàm tiện ích tạo màu sắc cho badge trạng thái
  const getStatusColor = (status) => {
    switch(status) {
      case "Chờ xác nhận": return { bg: "#422006", color: "#facc15" }; // Vàng
      case "Đang giao hàng": return { bg: "#172554", color: "#60a5fa" }; // Xanh dương
      case "Hoàn thành": return { bg: "#052e16", color: "#4ade80" }; // Xanh lá
      case "Đã hủy": return { bg: "#450a0a", color: "#f87171" }; // Đỏ
      default: return { bg: "#333", color: "#fff" };
    }
  };

  return (
    <div>
      {/* HEADER & THANH TÌM KIẾM */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: 0 }}>Quản lý Đơn hàng</h2>
        
        <div style={{ display: "flex", alignItems: "center", background: "#1a1a1a", border: "1px solid #333", borderRadius: "8px", padding: "8px 12px", width: "350px" }}>
          <Search size={18} color="#888" />
          <input 
            type="text" 
            placeholder="Tìm mã ĐH, Tên khách hàng, Tình trạng..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: "none", background: "transparent", color: "#fff", outline: "none", marginLeft: "10px", width: "100%", fontSize: "0.9rem" }}
          />
        </div>
      </div>

      {/* BẢNG DỮ LIỆU ĐƠN HÀNG */}
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
            {filteredOrders.length > 0 ? (
              filteredOrders.map(order => {
                const statusStyle = getStatusColor(order.status);
                return (
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
                      {/* Hiển thị Text thay vì Dropdown, kèm nút Edit để mở Modal */}
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ background: statusStyle.bg, color: statusStyle.color, padding: "4px 10px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "500" }}>
                          {order.status}
                        </span>
                        <button 
                          onClick={() => openStatusModal(order)}
                          style={{ background: "transparent", color: "#a3a3a3", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
                          title="Cập nhật trạng thái"
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                    <td style={{ padding: "15px" }}>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button style={{ background: "transparent", color: "#3b82f6", border: "none", cursor: "pointer" }}><Eye size={18} /></button>
                        <button style={{ background: "transparent", color: "#ef4444", border: "none", cursor: "pointer" }}><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" style={{ padding: "30px", textAlign: "center", color: "#888" }}>
                  Không tìm thấy đơn hàng nào phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL CẬP NHẬT TRẠNG THÁI */}
      {statusModal.isOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ background: "#1a1a1a", padding: "25px", borderRadius: "12px", width: "400px", border: "1px solid #333" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0, color: "#fff" }}>Cập nhật tình trạng đơn hàng</h3>
              <button onClick={() => setStatusModal({ ...statusModal, isOpen: false })} style={{ background: "transparent", border: "none", color: "#888", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>
            
            <p style={{ color: "#a3a3a3", fontSize: "0.95rem", marginBottom: "15px" }}>
              Bạn đang thay đổi trạng thái cho đơn hàng: <strong style={{ color: "#fff" }}>{statusModal.orderId}</strong>
            </p>

            <div style={{ marginBottom: "25px" }}>
              <label style={{ display: "block", color: "#888", marginBottom: "8px", fontSize: "0.9rem" }}>Tình trạng mới</label>
              <select 
                value={statusModal.targetStatus}
                onChange={(e) => setStatusModal({ ...statusModal, targetStatus: e.target.value })}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", background: "#222", color: "#fff", border: "1px solid #444", outline: "none", fontSize: "1rem" }}
              >
                <option value="Chờ xác nhận">Chờ xác nhận</option>
                <option value="Đang giao hàng">Đang giao hàng</option>
                <option value="Hoàn thành">Hoàn thành</option>
                <option value="Đã hủy">Đã hủy</option>
              </select>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button 
                onClick={() => setStatusModal({ ...statusModal, isOpen: false })} 
                style={{ padding: "10px 15px", background: "#333", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}
              >
                Hủy bỏ
              </button>
              <button 
                onClick={handleConfirmStatusChange}
                style={{ padding: "10px 15px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}
              >
                Xác nhận thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;