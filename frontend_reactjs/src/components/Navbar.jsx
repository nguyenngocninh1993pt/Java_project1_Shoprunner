import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar-wrapper slide-down">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          SHOESTORE
        </Link>

        {/* Navigation */}
        <div className="navbar-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "navlink active" : "navlink"
            }
          >
            Trang chủ
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "navlink active" : "navlink"
            }
          >
            Sản phẩm
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? "navlink active" : "navlink"
            }
          >
            Giỏ hàng
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
