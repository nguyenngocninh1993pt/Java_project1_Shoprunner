import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, Package, LogOut, Mail, Phone, MapPin, Save, Shield } from "lucide-react";
import "./Profile.css";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // State quản lý tab đang hiển thị ('info' hoặc 'orders')
  const [activeTab, setActiveTab] = useState("info");

  // State lưu trữ dữ liệu form (Lấy thông tin từ AuthContext nếu có, còn lại dùng dữ liệu giả lập)
  const [formData, setFormData] = useState({
    name: user?.name || "Khách hàng",
    email: user?.email || "user@gmail.com",
    phone: "0901234567",
    address: "123 Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM",
  });

  // Dữ liệu giả lập cho Lịch sử đơn hàng
  const [orders] = useState([
    { id: "ORD-1001", date: "06/04/2026", total: 2500000, status: "Đang giao hàng", itemCount: 1 },
    { id: "ORD-0988", date: "20/03/2026", total: 850000, status: "Hoàn thành", itemCount: 2 },
    { id: "ORD-0850", date: "15/02/2026", total: 3200000, status: "Đã hủy", itemCount: 1 },
  ]);

  // Xử lý khi gõ vào input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý lưu thông tin
  const handleSaveInfo = (e) => {
    e.preventDefault();
    // Ở đây thực tế bạn sẽ gọi API PUT/PATCH để cập nhật lên database
    alert("Cập nhật thông tin thành công!");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Hàm tạo màu cho trạng thái đơn hàng
  const getStatusColor = (status) => {
    switch (status) {
      case "Chờ xác nhận": return { bg: "rgba(250, 204, 21, 0.2)", color: "#facc15" };
      case "Đang giao hàng": return { bg: "rgba(96, 165, 250, 0.2)", color: "#60a5fa" };
      case "Hoàn thành": return { bg: "rgba(74, 222, 128, 0.2)", color: "#4ade80" };
      case "Đã hủy": return { bg: "rgba(248, 113, 113, 0.2)", color: "#f87171" };
      default: return { bg: "#333", color: "#fff" };
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        
        {/* SIDEBAR */}
        <div className="profile-sidebar">
          <div className="profile-avatar-section">
            <div className="avatar-circle">
              <User size={40} color="#888" />
            </div>
            <h3>{formData.name}</h3>
            <p>{user?.role === "admin" ? "Quản trị viên" : "Thành viên tiêu chuẩn"}</p>
          </div>

          <div className="profile-nav">
            <button 
              className={`nav-btn ${activeTab === "info" ? "active" : ""}`}
              onClick={() => setActiveTab("info")}
            >
              <User size={18} /> Thông tin cá nhân
            </button>
            <button 
              className={`nav-btn ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              <Package size={18} /> Lịch sử mua hàng
            </button>
            {user?.role === "admin" && (
              <button className="nav-btn" onClick={() => navigate("/admin")}>
                <Shield size={18} /> Vào trang quản trị
              </button>
            )}
            <button className="nav-btn logout" onClick={handleLogout}>
              <LogOut size={18} /> Đăng xuất
            </button>
          </div>
        </div>

        {/* NỘI DUNG CHÍNH */}
        <div className="profile-content">
          
          {/* TAB THÔNG TIN CÁ NHÂN */}
          {activeTab === "info" && (
            <div className="tab-pane slide-up">
              <h2 className="tab-title">Thông tin cá nhân</h2>
              <p className="tab-desc">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
              
              <form onSubmit={handleSaveInfo} className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Họ và tên</label>
                    <div className="input-with-icon">
                      <User size={18} className="input-icon" />
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <div className="input-with-icon">
                      <Mail size={18} className="input-icon" />
                      <input type="email" name="email" value={formData.email} onChange={handleChange} disabled title="Không thể đổi email" />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Số điện thoại</label>
                    <div className="input-with-icon">
                      <Phone size={18} className="input-icon" />
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Địa chỉ giao hàng mặc định</label>
                  <div className="input-with-icon">
                    <MapPin size={18} className="input-icon" />
                    <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                  </div>
                </div>

                <button type="submit" className="save-btn">
                  <Save size={18} /> Lưu Thay Đổi
                </button>
              </form>
            </div>
          )}

          {/* TAB LỊCH SỬ ĐƠN HÀNG */}
          {activeTab === "orders" && (
            <div className="tab-pane slide-up">
              <h2 className="tab-title">Lịch sử mua hàng</h2>
              <p className="tab-desc">Theo dõi tình trạng các đơn hàng bạn đã đặt</p>

              <div className="orders-list">
                {orders.length > 0 ? (
                  <table className="orders-table">
                    <thead>
                      <tr>
                        <th>Mã đơn</th>
                        <th>Ngày đặt</th>
                        <th>Số lượng SP</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => {
                        const statusStyle = getStatusColor(order.status);
                        return (
                          <tr key={order.id}>
                            <td className="fw-bold">{order.id}</td>
                            <td>{order.date}</td>
                            <td>{order.itemCount} sản phẩm</td>
                            <td className="fw-bold text-green">{order.total.toLocaleString()} ₫</td>
                            <td>
                              <span className="status-badge" style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div className="empty-orders">
                    <Package size={50} color="#555" />
                    <p>Bạn chưa có đơn hàng nào.</p>
                    <button onClick={() => navigate("/products")} className="shop-now-btn">Mua sắm ngay</button>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Profile;