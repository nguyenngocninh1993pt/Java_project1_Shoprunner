import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import productsData from "../data/products.json";
import { useCart } from "../context/CartContext";

const Products = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products] = useState(productsData);
  const [filtered, setFiltered] = useState(productsData);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const categories = ["All", ...new Set(productsData.map(p => p.category))];

  useEffect(() => {
    let result = [...products];
    if (search.trim()) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (category !== "All") result = result.filter(p => p.category === category);
    if (minPrice) result = result.filter(p => p.price >= Number(minPrice));
    if (maxPrice) result = result.filter(p => p.price <= Number(maxPrice));
    if (sortOrder === "asc") result.sort((a, b) => a.price - b.price);
    if (sortOrder === "desc") result.sort((a, b) => b.price - a.price);
    setFiltered(result);
  }, [search, category, sortOrder, minPrice, maxPrice, products]);

  const handleAddToCart = (item) => {
    addToCart(item, 1);
    toast.success(`Đã thêm ${item.name} vào giỏ hàng!`, {
      action: { label: "Xem giỏ hàng", onClick: () => navigate("/cart") },
    });
  };

  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
      <h1 className="section-title">Danh sách sản phẩm</h1>

      {/* Filters */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        marginBottom: "2rem",
        paddingLeft: "6%", 
        paddingRight: "6%"
      }}>
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "50px",
            border: "1px solid #333",
            background: "#111",
            color: "#fff",
            minWidth: "200px"
          }}
        />
        <select value={category} onChange={e => setCategory(e.target.value)}
          style={{ padding: "0.5rem 1rem", borderRadius: "50px", border: "1px solid #333", background: "#111", color: "#fff" }}
        >
          {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
        </select>
        <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}
          style={{ padding: "0.5rem 1rem", borderRadius: "50px", border: "1px solid #333", background: "#111", color: "#fff" }}
        >
          <option value="none">Mặc định</option>
          <option value="asc">Giá tăng dần</option>
          <option value="desc">Giá giảm dần</option>
        </select>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input type="number" min="0" placeholder="Từ" value={minPrice} onChange={e => setMinPrice(e.target.value)}
            style={{ width: "80px", padding: "0.3rem 0.5rem", borderRadius: "50px", border: "1px solid #333", background: "#111", color: "#fff" }} />
          <span>-</span>
          <input type="number" min="0" placeholder="Đến" value={maxPrice} onChange={e => setMaxPrice(e.target.value)}
            style={{ width: "80px", padding: "0.3rem 0.5rem", borderRadius: "50px", border: "1px solid #333", background: "#111", color: "#fff" }} />
        </div>
      </div>

      {/* Products grid */}
      {filtered.length === 0 ? (
        <p style={{ textAlign: "center", color: "#999", marginTop: "3rem" }}>Không tìm thấy sản phẩm nào.</p>
      ) : (
        <div className="featured-grid">
          {filtered.map(item => (
            <div key={item.id} className="product-card" onClick={() => navigate(`/product/${item.id}`)}>
              <div className="product-image">
                <img src={item.image} alt={item.name} />
                <button
                  className="cart-btn"
                  onClick={e => { e.stopPropagation(); handleAddToCart(item); }}
                  title="Thêm vào giỏ hàng"
                >
                  <ShoppingCart size={20} />
                </button>
              </div>
              <div className="product-info">
                <h3>{item.name}</h3>
                <p className="category">{item.category}</p>
                <p className="price">{item.price.toLocaleString()} ₫</p>
                <Link
                  to={`/product/${item.id}`}
                  onClick={e => e.stopPropagation()}
                  className="btn-outline"
                >
                  Mua ngay
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
