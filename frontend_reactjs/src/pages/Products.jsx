import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import productsData from "../data/products.json";
import { useCart } from "../context/CartContext";

const Products = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // States cho filter
  const [products] = useState(productsData);
  const [filtered, setFiltered] = useState(productsData);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("none");
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  // Lấy danh sách duy nhất để hiển thị bộ lọc
  const brands = [...new Set(productsData.map(p => p.brand).filter(Boolean))];
  const genders = ["Nam", "Nữ", "Unisex"];

  useEffect(() => {
    let result = [...products];

    // Lọc theo tìm kiếm
    if (search.trim()) {
      result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }

    // Lọc theo Giới tính (nếu có chọn)
    if (selectedGenders.length > 0) {
      result = result.filter(p => selectedGenders.includes(p.gender));
    }

    // Lọc theo Thương hiệu (nếu có chọn)
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    // Sắp xếp
    if (sortOrder === "asc") result.sort((a, b) => a.price - b.price);
    if (sortOrder === "desc") result.sort((a, b) => b.price - a.price);
    if (sortOrder === "az") result.sort((a, b) => a.name.localeCompare(b.name));
    if (sortOrder === "za") result.sort((a, b) => b.name.localeCompare(a.name));

    setFiltered(result);
  }, [search, sortOrder, selectedGenders, selectedBrands, products]);

  // Xử lý khi click vào checkbox
  const handleCheckboxChange = (value, state, setState) => {
    if (state.includes(value)) {
      setState(state.filter(item => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item, 1);
    toast.success(`Đã thêm ${item.name} vào giỏ hàng!`);
  };

  return (
    <div className="container" style={{ display: "flex", gap: "30px", paddingTop: "2rem", paddingBottom: "4rem" }}>
      
      {/* SIDEBAR BÊN TRÁI */}
      <aside style={{ width: "250px", flexShrink: 0 }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Bộ lọc ({selectedGenders.length + selectedBrands.length} lựa chọn)</h2>
        
        {/* Ô tìm kiếm chuyển vào sidebar */}
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem 1rem",
            marginBottom: "2rem",
            borderRadius: "5px",
            border: "1px solid #333",
            background: "#111",
            color: "#fff"
          }}
        />
        {/* Lọc Giới tính */}
        <div style={{ marginBottom: "2rem" }}>
          <h4 style={{ marginBottom: "10px", fontWeight: "bold" }}>Giới tính</h4>
          {genders.map(g => (
            <label key={g} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", cursor: "pointer" }}>
              <input 
                type="checkbox" 
                checked={selectedGenders.includes(g)}
                onChange={() => handleCheckboxChange(g, selectedGenders, setSelectedGenders)}
              />
              {g}
            </label>
          ))}
        </div>

        {/* Lọc Thương hiệu */}
        <div style={{ marginBottom: "2rem" }}>
          <h4 style={{ marginBottom: "10px", fontWeight: "bold" }}>Thương hiệu</h4>
          {brands.map(b => (
            <label key={b} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", cursor: "pointer" }}>
              <input 
                type="checkbox" 
                checked={selectedBrands.includes(b)}
                onChange={() => handleCheckboxChange(b, selectedBrands, setSelectedBrands)}
              />
              {b}
            </label>
          ))}
        </div>

        
      </aside>

      {/* NỘI DUNG BÊN PHẢI */}
      <main style={{ flexGrow: 1 }}>
        <div style={{ marginBottom: "3rem" }}>
          <h3 style={{ marginBottom: "2rem" }}>Sắp xếp theo</h3>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {[
              { label: "Mặc định", value: "none" },
              { label: "Giá: Tăng dần", value: "asc" },
              { label: "Giá: Giảm dần", value: "desc" },
              { label: "Tên: A-Z", value: "az" },
              { label: "Tên: Z-A", value: "za" },
            ].map(btn => (
              <button
                key={btn.value}
                onClick={() => setSortOrder(btn.value)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  background: sortOrder === btn.value ? "#000" : "#fff",
                  color: sortOrder === btn.value ? "#fff" : "#000",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        <h2 style={{ marginBottom: "1.5rem", fontSize: "1.8rem" }}>Tất cả sản phẩm</h2>

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
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
                <div className="product-info">
                  <h3>{item.name}</h3>
                  <p className="category">{item.brand || item.category}</p>
                  <p className="price">{item.price.toLocaleString()} ₫</p>
                  <Link to={`/product/${item.id}`} className="btn-outline">Mua ngay</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;