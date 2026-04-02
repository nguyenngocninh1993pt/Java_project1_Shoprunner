import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, LogIn } from "lucide-react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Logic giả lập kiểm tra tài khoản
    let userData = null;
    if (email === "admin@gmail.com" && password === "123") {
      userData = { email, role: "admin", name: "Quản trị viên" };
    } else if (email === "user@gmail.com" && password === "123") {
      userData = { email, role: "user", name: "Khách hàng" };
    }

    if (userData) {
      login(userData);
      // Điều hướng dựa trên quyền (Role)
      userData.role === "admin" ? navigate("/admin") : navigate("/");
    } else {
      alert("Thông tin đăng nhập không chính xác!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h2>Chào mừng trở lại</h2>
          <p>Đăng nhập để tiếp tục trải nghiệm SHOP RUNNER</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <Mail className="input-icon" size={20} />
            <input
              type="email"
              placeholder="Email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" /> Ghi nhớ tôi
            </label>
            <a href="#" className="forgot-password">Quên mật khẩu?</a>
          </div>

          <button type="submit" className="login-submit-btn">
            <LogIn size={20} />
            <span>Đăng nhập</span>
          </button>
        </form>

        <div className="login-footer">
          <p>Chưa có tài khoản? <a href="#">Đăng ký ngay</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;