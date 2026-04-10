import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Settings,
  LogOut,
  Menu,
  
} from "lucide-react";
import "./AdminLayout.css";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Thêm logic xóa token/user data ở đây
    navigate("/login");
  };

  return (
    <div className="admin-container">
      {/* --- SIDEBAR --- */}
      <aside className={`admin-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        
        {/* ĐÃ CẬP NHẬT PHẦN LOGO NÀY */}
        <div className="sidebar-logo">
          <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
            <h2>{isSidebarOpen ? "SHOP RUNNER" : "SR"}</h2>
          </Link>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/admin" className="nav-item active">
            <LayoutDashboard size={20} />
            <span className="nav-label">Tổng quan</span>
          </Link>
          <Link to="/admin/orders" className="nav-item">
            <ShoppingCart size={20} />
            <span className="nav-label">Đơn hàng</span>
          </Link>
          <Link to="/admin/products" className="nav-item">
            <Package size={20} />
            <span className="nav-label">Sản phẩm</span>
          </Link>
          <Link to="/admin/customers" className="nav-item">
            <Users size={20} />
            <span className="nav-label">Khách hàng</span>
          </Link>
          <Link to="/admin/settings" className="nav-item">
            <Settings size={20} />
            <span className="nav-label">Cài đặt</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            <span className="nav-label">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* --- KẾT THÚC SIDEBAR --- */}

      <div className="admin-main">
        {/* --- HEADER --- */}
        <header className="admin-header">
          <div className="header-left">
            <button 
              className="menu-toggle-btn"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu size={24} />
            </button>
          </div>

          <div className="header-right">
            
            <div className="admin-profile">
              <img 
                src="https://ui-avatars.com/api/?name=Admin&background=fff&color=000" 
                alt="Admin" 
                className="avatar" 
              />
              <span className="admin-name">Admin</span>
            </div>
          </div>
        </header>
        {/* --- KẾT THÚC HEADER --- */}

        {/* --- MAIN CONTENT --- */}
        <main className="admin-content">
          {/* Nơi hiển thị nội dung các trang con dựa theo Route */}
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;