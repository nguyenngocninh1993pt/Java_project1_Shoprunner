import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import productsData from "../data/products.json";
import { useCart } from "../context/CartContext";

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    setFeatured(productsData.slice(0, 8));
  }, []);

  const handleAddToCart = (item, e) => {
    e.stopPropagation();
    addToCart(item, 1);
    toast.success(`Đã thêm ${item.name} vào giỏ hàng!`, {
      action: {
        label: "Xem giỏ hàng",
        onClick: () => navigate("/cart"),
      },
    });
  };

  return (
    <div className="home">
      {/* 🎬 Hero Section */}
      <section className="hero-section">
        <video
          className="hero-video"
          src="hero.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="hero-overlay">
          <h1 className="hero-title">Just Feel The Power</h1>
          <p className="hero-subtitle">
            Bộ sưu tập giày Nike mới nhất — tốc độ, phong cách và hiệu năng đỉnh cao.
          </p>
          <Link to="/products" className="btn">
            Khám phá ngay
          </Link>
        </div>
      </section>

      {/* 🏀 Shop by Sport */}
      <section className="sport-section container">
        <h2 className="section-title">Shop by Sport</h2>
        <div className="sport-grid">
          {[
            {
              title: "Running",
              img: "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/5c2d3b6e-cbfa-4944-9573-6e62c521e517/WMNS+NIKE+AIR+MAX+EXCEE.png",
            },
            {
              title: "Training",
              img: "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/805533ff-a59c-486c-9629-f690babde17a/NIKE+AIR+MAX+AP.png",
            },
            {
              title: "Basketball",
              img: "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/f50fb043-d54c-466a-ade0-f97ebc8626e8/NIKE+AIR+MAX+90+PRM.png",
            },
            {
              title: "Lifestyle",
              img: "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/f6463f6b-06bd-484f-a1c4-224013e3282f/W+NIKE+AIR+MAX+PORTAL.png",
            },
          ].map((sport, i) => (
            <div key={i} className="sport-card" onClick={() => navigate("/products")}>
              <img src={sport.img} alt={sport.title} />
              <div className="sport-overlay">
                <span>{sport.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🛍️ Featured Products */}
      <section className="featured-section container">
        <h2 className="section-title">Outstanding product</h2>
        <div className="featured-grid">
          {featured.map((item) => (
            <div
              key={item.id}
              className="product-card"
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <div className="product-image">
                <img src={item.image} alt={item.name} />
                <button
                  className="cart-btn"
                  onClick={(e) => handleAddToCart(item, e)}
                >
                  <ShoppingCart size={18} />
                </button>
              </div>
              <div className="product-info">
                <h3>{item.name}</h3>
                <p className="category">{item.category}</p>
                <p className="price">{item.price.toLocaleString()} ₫</p>
                <Link
                  to={`/product/${item.id}`}
                  className="btn-outline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Mua ngay
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🏷️ Shop by Icons */}
      <section className="icons-section">
        <div className="container">
          <h2 className="section-title">Shop by Icons</h2>
          <div className="scroll-row">
            {[...productsData, ...productsData].map((item, index) => (
              <div
                key={index}
                className="scroll-item"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img src={item.image} alt={item.name} />
                <div className="scroll-overlay">
                  <p>{item.name}</p>
                  <div className="scroll-actions">
                    <button
                      onClick={(e) => handleAddToCart(item, e)}
                      className="scroll-btn"
                    >
                      <ShoppingCart size={16} />
                    </button>
                    <Link
                      to={`/product/${item.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="scroll-btn"
                    >
                      Mua ngay
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
