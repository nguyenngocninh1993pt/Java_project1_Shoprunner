import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import "./Footer.css";

function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            footer.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 } // chỉ cần 20% footer hiển thị là kích hoạt
    );

    if (footer) observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="footer-wrapper" ref={footerRef}>
      {/* Nội dung chính */}
      <div className="footer-container">
        {/* Cột 1 - Giới thiệu */}
        <div className="footer-col">
          <h2 className="footer-logo">SHOESTORE</h2>
          <p className="footer-text">
            Cửa hàng chính hãng chuyên cung cấp giày thể thao Nike và các dòng
            sneaker cao cấp. <br />
            Trải nghiệm hiệu năng và phong cách đỉnh cao cùng chúng tôi.
          </p>
        </div>

        {/* Cột 2 - Liên kết */}
        <div className="footer-col" style={{ transitionDelay: "0.1s" }}>
          <h3 className="footer-title">Khám phá</h3>
          <ul className="footer-links">
            <li><Link to="/">Trang chủ</Link></li>
            <li><Link to="/products">Sản phẩm</Link></li>
            <li><a href="#">Giới thiệu</a></li>
            <li><a href="#">Liên hệ</a></li>
          </ul>
        </div>

        {/* Cột 3 - Hỗ trợ */}
        <div className="footer-col" style={{ transitionDelay: "0.2s" }}>
          <h3 className="footer-title">Hỗ trợ</h3>
          <ul className="footer-links">
            <li><a href="#">Chính sách đổi trả</a></li>
            <li><a href="#">Giao hàng & Thanh toán</a></li>
            <li><a href="#">Chính sách bảo mật</a></li>
          </ul>
        </div>

        {/* Cột 4 - Mạng xã hội */}
        <div className="footer-col" style={{ transitionDelay: "0.3s" }}>
          <h3 className="footer-title">Theo dõi chúng tôi</h3>
          <div className="footer-socials">
            {[
              { icon: Facebook, url: "https://facebook.com" },
              { icon: Instagram, url: "https://instagram.com" },
              { icon: Youtube, url: "https://youtube.com" },
              { icon: Twitter, url: "https://x.com" },
            ].map(({ icon: Icon, url }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <Icon size={22} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Dòng cuối */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Shoestore. All rights reserved.
          <br />
          Made by <span className="footer-team">Shoestore Team</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
