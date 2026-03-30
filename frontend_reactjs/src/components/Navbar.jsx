import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom"; // Thêm useNavigate
import { Search, ShoppingCart, User, LogOut, Settings } from "lucide-react"; // Thêm icon
// Import hook useCart và useAuth
import { useCart } from "../context/CartContext"; 
import { useAuth } from "../context/AuthContext" // Giả định bạn đã tạo file này theo hướng dẫn trước
import "./Navbar.css";

function Navbar() {
  const { cartItems } = useCart();
  const { user, logout } = useAuth(); // Lấy thông tin user và hàm logout
  const navigate = useNavigate();

  // Tính tổng số lượng sản phẩm đang có trong giỏ
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar-wrapper slide-down">
      <div className="navbar-container">
        
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">SHOP RUNNER</Link>
        </div>

        <div className="navbar-center">
          <div className="navbar-search">
            <input type="text" placeholder="Tìm giày chạy bộ, đồ tập..." />
            <Search className="search-icon" size={20} />
          </div>
        </div>

        <div className="navbar-right">
          <div className="navbar-links">
            <NavLink to="/" className={({ isActive }) => (isActive ? "navlink active" : "navlink")}>
              Trang chủ
            </NavLink>
            <NavLink to="/products" className={({ isActive }) => (isActive ? "navlink active" : "navlink")}>
              Sản phẩm
            </NavLink>
          </div>

          <div className="navbar-actions">
            <NavLink to="/cart" className="action-icon-link">
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </NavLink>

            {/* KIỂM TRA ĐĂNG NHẬP ĐỂ HIỂN THỊ GIAO DIỆN PHÙ HỢP */}
            {user ? (
              <div className="user-logged-in">
                <div className="user-info">
                  <User size={20} />
                  <span className="user-name">{user.name}</span>
                </div>
                
                {/* Menu thả xuống khi hover */}
                <div className="user-dropdown">
                  {user.role === "admin" && (
                    <Link to="/admin" className="dropdown-item">
                      <Settings size={16} /> Quản trị
                    </Link>
                  )}
                  <button onClick={handleLogout} className="dropdown-item logout-btn">
                    <LogOut size={16} /> Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="login-button">
                <User size={20} />
                <span>Đăng nhập</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;