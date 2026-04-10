import React, { useState, useEffect } from "react";
import { Edit2, Trash2, Plus, X, Upload } from "lucide-react";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Khởi tạo dữ liệu mẫu
  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: "Giày chạy bộ Nike Air Zoom",
        brand: "Nike",
        category: "Giày Thể Thao",
        images: ["https://via.placeholder.com/150", "https://via.placeholder.com/150/ff0000"], // Sửa thành mảng
        variants: [
          { id: 101, color: "Đen", size: "40", price: 3200000, stock: 10 },
          { id: 102, color: "Đỏ", size: "41", price: 3300000, stock: 5 },
        ],
      },
      {
        id: 2,
        name: "Áo khoác gió thể thao",
        brand: "Adidas",
        category: "Áo Khoác",
        images: ["https://via.placeholder.com/150"],
        variants: [
          { id: 103, color: "Xanh Navy", size: "L", price: 850000, stock: 50 },
        ],
      },
    ]);
  }, []);

  const handleAddNewClick = () => {
    setEditingProduct({
      id: Date.now(),
      name: "",
      brand: "",
      category: "",
      images: [], // Khởi tạo mảng rỗng
      isNew: true,
      variants: [{ id: Date.now() + 1, color: "", size: "", price: 0, stock: 0 }],
    });
  };

  const handleEditClick = (product) => {
    setEditingProduct(JSON.parse(JSON.stringify(product)));
  };

  const handleSave = () => {
    if (editingProduct.isNew) {
      const { isNew, ...newProduct } = editingProduct;
      setProducts([newProduct, ...products]);
    } else {
      setProducts(products.map((p) => (p.id === editingProduct.id ? editingProduct : p)));
    }
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  // --- XỬ LÝ HÌNH ẢNH SẢN PHẨM ---
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const currentImages = editingProduct.images || [];
    
    // Tính toán số lượng ảnh được phép thêm để không vượt quá 5
    const remainingSlots = 5 - currentImages.length;
    
    if (files.length > remainingSlots) {
      alert(`Bạn chỉ có thể thêm tối đa 5 hình ảnh. Hệ thống sẽ tự động chọn ${remainingSlots} ảnh đầu tiên.`);
    }

    // Chỉ lấy số file vừa đủ với slot còn lại
    const allowedFiles = files.slice(0, remainingSlots);
    
    // Tạo URL preview cho file ảnh cục bộ (Khi có API bạn sẽ cần gọi form-data ở đây)
    const newImageUrls = allowedFiles.map(file => URL.createObjectURL(file));

    setEditingProduct({
      ...editingProduct,
      images: [...currentImages, ...newImageUrls]
    });
  };

  const handleRemoveImage = (indexToRemove) => {
    setEditingProduct({
      ...editingProduct,
      images: editingProduct.images.filter((_, index) => index !== indexToRemove)
    });
  };

  // --- XỬ LÝ VARIANT ---
  const handleAddVariant = () => {
    setEditingProduct({
      ...editingProduct,
      variants: [...editingProduct.variants, { id: Date.now(), color: "", size: "", price: 0, stock: 0 }]
    });
  };

  const handleRemoveVariant = (variantId) => {
    setEditingProduct({ ...editingProduct, variants: editingProduct.variants.filter(v => v.id !== variantId) });
  };

  const handleVariantChange = (variantId, field, value) => {
    const updatedVariants = editingProduct.variants.map((variant) => 
      variant.id === variantId ? { ...variant, [field]: value } : variant
    );
    setEditingProduct({ ...editingProduct, variants: updatedVariants });
  };

  const getTotalStock = (variants) => variants.reduce((sum, v) => sum + (Number(v.stock) || 0), 0);
  
  const getPriceDisplay = (variants) => {
    if (!variants || variants.length === 0) return "Chưa có giá";
    const prices = variants.map(v => Number(v.price) || 0);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    if (minPrice === maxPrice) return `${minPrice.toLocaleString()} ₫`;
    return `${minPrice.toLocaleString()} ₫ - ${maxPrice.toLocaleString()} ₫`;
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2>Quản lý Sản phẩm</h2>
        <button onClick={handleAddNewClick} style={{ display: "flex", alignItems: "center", gap: "8px", background: "#3b82f6", color: "#fff", border: "none", padding: "10px 15px", borderRadius: "8px", cursor: "pointer" }}>
          <Plus size={18} /> Thêm sản phẩm
        </button>
      </div>

      <div style={{ background: "#1a1a1a", borderRadius: "12px", border: "1px solid #333", overflow: "hidden", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", color: "#fff", minWidth: "800px" }}>
          <thead style={{ background: "#222", borderBottom: "1px solid #333" }}>
            <tr>
              <th style={{ padding: "15px" }}>Hình ảnh</th>
              <th style={{ padding: "15px" }}>Tên sản phẩm</th>
              <th style={{ padding: "15px" }}>Thương hiệu & Danh mục</th>
              <th style={{ padding: "15px" }}>Giá bán</th>
              <th style={{ padding: "15px" }}>Tổng tồn kho</th>
              <th style={{ padding: "15px" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} style={{ borderBottom: "1px solid #333" }}>
                <td style={{ padding: "15px" }}>
                  {/* Hiển thị ảnh đầu tiên làm ảnh đại diện, nếu không có thì để trống */}
                  {product.images && product.images.length > 0 ? (
                    <img src={product.images[0]} alt={product.name} style={{ width: "50px", height: "50px", borderRadius: "8px", objectFit: "cover", border: "1px solid #444" }} />
                  ) : (
                    <div style={{ width: "50px", height: "50px", borderRadius: "8px", background: "#333", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#888" }}>No Image</div>
                  )}
                </td>
                <td style={{ padding: "15px", fontWeight: "500" }}>{product.name}</td>
                <td style={{ padding: "15px" }}>
                  <div style={{ fontSize: "0.9em", color: "#a3a3a3" }}>{product.brand}</div>
                  <div style={{ fontSize: "0.85em", background: "#333", display: "inline-block", padding: "2px 8px", borderRadius: "4px", marginTop: "4px" }}>{product.category}</div>
                </td>
                <td style={{ padding: "15px", color: "#4ade80" }}>{getPriceDisplay(product.variants)}</td>
                <td style={{ padding: "15px" }}>{getTotalStock(product.variants)}</td>
                <td style={{ padding: "15px" }}>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button onClick={() => handleEditClick(product)} style={{ background: "transparent", color: "#eab308", border: "none", cursor: "pointer" }}><Edit2 size={18} /></button>
                    <button onClick={() => handleDeleteProduct(product.id)} style={{ background: "transparent", color: "#ef4444", border: "none", cursor: "pointer" }}><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODAL CHỈNH SỬA / THÊM MỚI --- */}
      {editingProduct && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ background: "#1a1a1a", padding: "30px", borderRadius: "12px", width: "700px", maxHeight: "90vh", overflowY: "auto", border: "1px solid #333" }}>
            <h3 style={{ marginTop: 0, color: "#fff", marginBottom: "20px" }}>
              {editingProduct.isNew ? "Thêm Sản phẩm mới" : "Chỉnh sửa Sản phẩm"}
            </h3>
            
            {/* THÔNG TIN CHUNG */}
            <div style={{ marginBottom: "15px" }}>
              <label style={{ color: "#a3a3a3", fontSize: "0.9rem", display: "block", marginBottom: "5px" }}>Tên sản phẩm</label>
              <input type="text" value={editingProduct.name} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} style={{ width: "100%", padding: "10px", background: "#222", border: "1px solid #444", color: "#fff", borderRadius: "8px", boxSizing: "border-box" }} />
            </div>

            <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
              <div style={{ flex: 1 }}>
                <label style={{ color: "#a3a3a3", fontSize: "0.9rem", display: "block", marginBottom: "5px" }}>Thương hiệu (Brand)</label>
                <input type="text" value={editingProduct.brand} onChange={(e) => setEditingProduct({...editingProduct, brand: e.target.value})} style={{ width: "100%", padding: "10px", background: "#222", border: "1px solid #444", color: "#fff", borderRadius: "8px", boxSizing: "border-box" }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ color: "#a3a3a3", fontSize: "0.9rem", display: "block", marginBottom: "5px" }}>Danh mục (Category)</label>
                <input type="text" value={editingProduct.category} onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})} style={{ width: "100%", padding: "10px", background: "#222", border: "1px solid #444", color: "#fff", borderRadius: "8px", boxSizing: "border-box" }} />
              </div>
            </div>

            {/* QUẢN LÝ HÌNH ẢNH */}
            <div style={{ background: "#222", padding: "15px", borderRadius: "8px", border: "1px solid #333", marginBottom: "25px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <label style={{ color: "#fff", fontSize: "0.9rem", fontWeight: "500" }}>Hình ảnh sản phẩm (Tối đa 5)</label>
                <span style={{ color: editingProduct.images?.length === 5 ? "#ef4444" : "#a3a3a3", fontSize: "0.85rem" }}>
                  {editingProduct.images?.length || 0} / 5 ảnh
                </span>
              </div>
              
              {/* Vùng chọn file */}
              <div style={{ position: "relative" }}>
                <input 
                  type="file" 
                  multiple 
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={editingProduct.images?.length >= 5}
                  style={{ 
                    position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, 
                    cursor: editingProduct.images?.length >= 5 ? "not-allowed" : "pointer", zIndex: 10 
                  }} 
                />
                <div style={{ 
                  width: "100%", padding: "20px", border: "1px dashed #555", borderRadius: "8px", textAlign: "center", 
                  background: editingProduct.images?.length >= 5 ? "#2a2a2a" : "#111", color: "#888", boxSizing: "border-box" 
                }}>
                  <Upload size={24} style={{ marginBottom: "5px", color: "#555" }} />
                  <p style={{ margin: 0, fontSize: "0.9rem" }}>Kéo thả hoặc click để chọn ảnh (Bulk upload)</p>
                </div>
              </div>

              {/* Lưới hiển thị ảnh Preview */}
              {editingProduct.images && editingProduct.images.length > 0 && (
                <div style={{ display: "flex", gap: "12px", marginTop: "15px", flexWrap: "wrap" }}>
                  {editingProduct.images.map((imgUrl, index) => (
                    <div key={index} style={{ position: "relative", width: "80px", height: "80px" }}>
                      <img src={imgUrl} alt={`preview-${index}`} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px", border: "1px solid #444" }} />
                      <button 
                        onClick={() => handleRemoveImage(index)}
                        style={{ position: "absolute", top: "-8px", right: "-8px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "50%", width: "22px", height: "22px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0, boxShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
                        title="Xóa ảnh này"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <hr style={{ borderColor: "#333", margin: "20px 0" }} />

            {/* QUẢN LÝ PHÂN LOẠI (VARIANTS) */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
              <h4 style={{ margin: 0, color: "#fff" }}>Phân loại sản phẩm (Variants)</h4>
              <button onClick={handleAddVariant} style={{ background: "#22c55e", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "5px" }}>
                <Plus size={14} /> Thêm phân loại
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "25px" }}>
              {editingProduct.variants.map((variant, index) => (
                <div key={variant.id} style={{ display: "flex", gap: "10px", alignItems: "flex-end", background: "#222", padding: "15px", borderRadius: "8px", border: "1px solid #333" }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ color: "#a3a3a3", fontSize: "0.8rem", display: "block", marginBottom: "5px" }}>Màu sắc</label>
                    <input type="text" placeholder="Đỏ, Xanh..." value={variant.color} onChange={(e) => handleVariantChange(variant.id, 'color', e.target.value)} style={{ width: "100%", padding: "8px", background: "#111", border: "1px solid #444", color: "#fff", borderRadius: "6px", boxSizing: "border-box" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ color: "#a3a3a3", fontSize: "0.8rem", display: "block", marginBottom: "5px" }}>Kích cỡ</label>
                    <input type="text" placeholder="S, M, L..." value={variant.size} onChange={(e) => handleVariantChange(variant.id, 'size', e.target.value)} style={{ width: "100%", padding: "8px", background: "#111", border: "1px solid #444", color: "#fff", borderRadius: "6px", boxSizing: "border-box" }} />
                  </div>
                  <div style={{ flex: 1.5 }}>
                    <label style={{ color: "#a3a3a3", fontSize: "0.8rem", display: "block", marginBottom: "5px" }}>Giá bán (VNĐ)</label>
                    <input type="number" value={variant.price} onChange={(e) => handleVariantChange(variant.id, 'price', e.target.value)} style={{ width: "100%", padding: "8px", background: "#111", border: "1px solid #444", color: "#fff", borderRadius: "6px", boxSizing: "border-box" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ color: "#a3a3a3", fontSize: "0.8rem", display: "block", marginBottom: "5px" }}>Tồn kho</label>
                    <input type="number" value={variant.stock} onChange={(e) => handleVariantChange(variant.id, 'stock', e.target.value)} style={{ width: "100%", padding: "8px", background: "#111", border: "1px solid #444", color: "#fff", borderRadius: "6px", boxSizing: "border-box" }} />
                  </div>
                  <button 
                    onClick={() => handleRemoveVariant(variant.id)}
                    disabled={editingProduct.variants.length === 1}
                    style={{ background: "transparent", color: editingProduct.variants.length === 1 ? "#555" : "#ef4444", border: "none", cursor: editingProduct.variants.length === 1 ? "not-allowed" : "pointer", padding: "8px" }}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* BUTTON ACTION MODAL */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => setEditingProduct(null)} style={{ padding: "10px 15px", background: "#333", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}>Hủy</button>
              <button onClick={handleSave} style={{ padding: "10px 15px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}>Lưu Sản Phẩm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;