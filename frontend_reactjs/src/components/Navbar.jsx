import React from "react";
import { Link, NavLink } from "react-router-dom";
// Import các icon cần thiết
import { Search, ShoppingCart, User } from "lucide-react"; 
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar-wrapper slide-down">
      <div className="navbar-container">
        
        {/* --- KHỐI 1: TÊN CỬA HÀNG (Bên trái) --- */}
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            SHOP RUNNER
          </Link>
        </div>

        {/* --- KHỐI 2: THANH TÌM KIẾM (Ở giữa) --- */}
        <div className="navbar-center">
          <div className="navbar-search">
            <input type="text" placeholder="Tìm giày chạy bộ, đồ tập..." />
            <Search className="search-icon" size={20} />
          </div>
        </div>

        {/* --- KHỐI 3: ĐIỀU HƯỚNG & TÀI KHOẢN (Bên phải) --- */}
        <div className="navbar-right">
          <div className="navbar-links">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "navlink active" : "navlink")}
            >
              Trang chủ
            </NavLink>

            {/* Dropdown Sản phẩm giữ nguyên */}
            <div className="nav-item-dropdown">
              <NavLink
                to="/products"
                className={({ isActive }) => (isActive ? "navlink active" : "navlink")}
              >
                Sản phẩm
              </NavLink>
              <div className="dropdown-menu">
                <Link to="/products/giay-nam">Giày Nam</Link>
                <Link to="/products/giay-nu">Giày Nữ</Link>
                <Link to="/products/giay-tre-em">Giày Trẻ Em</Link>
                <Link to="/products/may-chay-bo">Máy Chạy Bộ</Link>
                <div className="dropdown-submenu">
                  <Link to="/products/phu-kien" className="submenu-trigger">
                    Phụ Kiện <span className="arrow">▶</span>
                  </Link>
                  <div className="submenu-content">
                    <Link to="/products/phu-kien/tat-vo">Tất & Vớ</Link>
                    <Link to="/products/phu-kien/bang-do">Băng đô</Link>
                    <Link to="/products/phu-kien/quan-ao">Quần Áo</Link>
                    <Link to="/products/phu-kien/tui-the-thao">Túi thể thao</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- KHU VỰC ICON HÀNH ĐỘNG (Cuối cùng) --- */}
          <div className="navbar-actions">
            {/* Giỏ hàng dạng Icon */}
            <NavLink to="/cart" className="action-icon-link">
              <ShoppingCart size={22} />
              {/* Ví dụ badge số lượng */}
              {/* <span className="cart-badge">3</span> */}
            </NavLink>

            {/* Đăng nhập / Tài khoản */}
            {/* Sau này logic sẽ check: nếu chưa login hiện Link login,
                nếu đã login hiện Dropdown tài khoản User/Admin */}
            <Link to="/login" className="login-button">
              <User size={20} />
              <span>Đăng nhập</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;