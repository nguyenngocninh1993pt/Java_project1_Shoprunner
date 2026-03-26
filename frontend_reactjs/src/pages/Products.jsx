import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";

const Products = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("none");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Không lấy được danh sách sản phẩm");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = [...products];

    // search theo tên
    if (search.trim()) {
      result = result.filter((p) =>
        p.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // lọc giá theo minPrice
    if (minPrice) {
      result = result.filter((p) => p.minPrice >= Number(minPrice));
    }

    if (maxPrice) {
      result = result.filter((p) => p.minPrice <= Number(maxPrice));
    }

    // sort theo minPrice
    if (sortOrder === "asc") {
      result.sort((a, b) => a.minPrice - b.minPrice);
    }

    if (sortOrder === "desc") {
      result.sort((a, b) => b.minPrice - a.minPrice);
    }

    setFiltered(result);
  }, [search, sortOrder, minPrice, maxPrice, products]);

  const handleAddToCart = (item) => {
    addToCart(item, 1);
    toast.success(`Đã thêm ${item.name} vào giỏ hàng!`, {
      action: { label: "Xem giỏ hàng", onClick: () => navigate("/cart") },
    });
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Đang tải...</p>;
  }

  return (
    <div
      className="container"
      style={{ paddingTop: "2rem", paddingBottom: "4rem" }}
    >
      <h1 className="section-title">Danh sách sản phẩm</h1>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2rem",
          paddingLeft: "6%",
          paddingRight: "6%",
        }}
      >
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="none">Mặc định</option>
          <option value="asc">Giá tăng</option>
          <option value="desc">Giá giảm</option>
        </select>

        <input
          type="number"
          placeholder="Giá từ"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Giá đến"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {/* Products */}
      {filtered.length === 0 ? (
        <p style={{ textAlign: "center" }}>Không có sản phẩm</p>
      ) : (
        <div className="featured-grid">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="product-card"
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <div className="product-image">
                <img
                  src={item.image || "https://via.placeholder.com/300x300?text=No+Image"}
                  alt={item.name}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(item);
                  }}
                >
                  <ShoppingCart size={20} />
                </button>
              </div>

              <div className="product-info">
                <h3>{item.name}</h3>
                {/* <p>{item.description || "Chưa có mô tả"}</p> */}
                <p>{item.minPrice?.toLocaleString()} ₫</p>

                <Link
                  to={`/product/${item.id}`}
                  onClick={(e) => e.stopPropagation()}
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