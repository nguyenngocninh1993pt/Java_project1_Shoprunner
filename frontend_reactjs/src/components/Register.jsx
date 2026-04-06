import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, UserPlus, CheckCircle, AlertCircle } from "lucide-react";
import "./Login.css";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Thêm state để quản lý thông báo
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" }); // Reset thông báo

    // Kiểm tra mật khẩu xác nhận
    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Mật khẩu xác nhận không khớp!" });
      return;
    }

    setIsLoading(true);

    // Giả lập delay gọi API (1 giây)
    setTimeout(() => {
      setIsLoading(false);
      setMessage({ type: "success", text: "Đăng ký thành công! Đang chuyển hướng..." });
      
      // Tự động chuyển về trang đăng nhập sau 2 giây
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    }, 1000);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h2>Tạo tài khoản mới</h2>
          <p>Tham gia cùng SHOP RUNNER ngay hôm nay</p>
        </div>

        {/* Khu vực hiển thị thông báo hiện đại */}
        {message.text && (
          <div className={`modern-alert alert-${message.type}`}>
            {message.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <User className="input-icon" size={20} />
            <input
              type="text"
              placeholder="Họ và tên"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

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

          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="login-submit-btn" 
            disabled={isLoading || message.type === "success"}
          >
            <UserPlus size={20} />
            <span>{isLoading ? "Đang xử lý..." : "Đăng ký"}</span>
          </button>
        </form>

        <div className="login-footer">
          <p>Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;