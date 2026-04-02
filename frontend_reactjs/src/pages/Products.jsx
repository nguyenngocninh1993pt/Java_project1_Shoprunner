import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import "./Products.css";

const ITEMS_PER_PAGE = 16;

const Products = () => {
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(1);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  /* ================= FETCH ALL PRODUCTS ================= */
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        let all = [];
        let pageIndex = 0;

        while (true) {
          const res = await fetch(
            `http://localhost:8080/api/v1/products/detail?page=${pageIndex}`,
          );

          const data = await res.json();

          if (!data.products || data.products.length === 0) {
            break;
          }

          const mapped = data.products.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.variants?.[0]?.price || 0,
            brand: item.brand || "",
            category: item.categories?.[0]?.name || "",
            image: item.images?.[0]?.imageUrl || "",
          }));

          all = [...all, ...mapped];

          pageIndex++;
        }

        setAllProducts(all);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllProducts();
  }, []);
  /* ================= FILTER ================= */

  const categories = [...new Set(allProducts.map((p) => p.category))];
  const brands = [...new Set(allProducts.map((p) => p.brand))];

  const toggleCheckbox = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter((v) => v !== value));
    } else {
      setList([...list, value]);
    }
  };

  const filtered = allProducts.filter((p) => {
    if (selectedCategories.length && !selectedCategories.includes(p.category))
      return false;
    if (selectedBrands.length && !selectedBrands.includes(p.brand))
      return false;
    if (minPrice && p.price < Number(minPrice)) return false;
    if (maxPrice && p.price > Number(maxPrice)) return false;
    return true;
  });

  /* ================= RESET PAGE WHEN FILTER ================= */
  useEffect(() => {
    setPage(1);
  }, [selectedCategories, selectedBrands, minPrice, maxPrice]);

  /* ================= PAGINATION ================= */

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const displayProducts = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  /* ================= RENDER ================= */

  return (
    <div className="products-layout">
      {/* SIDEBAR */}
      <div className="sidebar">
        <h3 className="filter-title">Filter</h3>

        {/* CATEGORY */}
        <div className="filter-group">
          <p>Category</p>
          {categories.map((cat, i) => (
            <label key={i} className="filter-item">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() =>
                  toggleCheckbox(cat, selectedCategories, setSelectedCategories)
                }
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>

        {/* BRAND */}
        <div className="filter-group">
          <p>Brand</p>
          {brands.map((brand, i) => (
            <label key={i} className="filter-item">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() =>
                  toggleCheckbox(brand, selectedBrands, setSelectedBrands)
                }
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>

        {/* PRICE */}
        <div className="filter-group">
          <p>Price</p>
          <div className="price-inputs">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="products-content">
        <div className="featured-grid">
          {displayProducts.map((item) => (
            <div
              key={item.id}
              className="product-card"
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <div className="product-image">
                <img src={item.image} alt={item.name} />
              </div>

              <div className="product-info">
                <h3 className="product-name">{item.name}</h3>

                <div className="product-bottom">
                  <p className="price">{item.price.toLocaleString()} ₫</p>

                  <button
                    className="cart-icon-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Add to cart", item);
                    }}
                  >
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Prev
          </button>

          <span>
            {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;