import React, { useState, useEffect } from "react";
import { Edit2, Trash2, Plus } from "lucide-react";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch sản phẩm (Giống cách bạn làm bên Products.jsx)
  useEffect(() => {
    // Để dễ test giao diện khi chưa cắm API PUT/POST, tôi khởi tạo vài sản phẩm mẫu
    setProducts([
      { id: 1, name: "Giày chạy bộ Nike Air Zoom", price: 3200000, stock: 15, image: "https://via.placeholder.com/50" },
      { id: 2, name: "Áo khoác gió thể thao", price: 850000, stock: 50, image: "https://via.placeholder.com/50" },
    ]);
  }, []);

  const handleEditClick = (product) => {
    setEditingProduct({ ...product }); // Mở modal với thông tin SP
  };

  const handleSave = () => {
    // Cập nhật lại mảng (Thực tế bạn sẽ gọi API PUT ở đây)
    setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
    setEditingProduct(null); // Đóng modal
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2>Quản lý Sản phẩm</h2>
        <button style={{ display: "flex", alignItems: "center", gap: "8px", background: "#3b82f6", color: "#fff", border: "none", padding: "10px 15px", borderRadius: "8px", cursor: "pointer" }}>
          <Plus size={18} /> Thêm sản phẩm
        </button>
      </div>

      <div style={{ background: "#1a1a1a", borderRadius: "12px", border: "1px solid #333", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", color: "#fff" }}>
          <thead style={{ background: "#222", borderBottom: "1px solid #333" }}>
            <tr>
              <th style={{ padding: "15px" }}>Hình ảnh</th>
              <th style={{ padding: "15px" }}>Tên sản phẩm</th>
              <th style={{ padding: "15px" }}>Giá bán</th>
              <th style={{ padding: "15px" }}>Số lượng (Stock)</th>
              <th style={{ padding: "15px" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} style={{ borderBottom: "1px solid #333" }}>
                <td style={{ padding: "15px" }}><img src={product.image} alt={product.name} style={{ width: "50px", height: "50px", borderRadius: "8px", objectFit: "cover" }} /></td>
                <td style={{ padding: "15px", fontWeight: "500" }}>{product.name}</td>
                <td style={{ padding: "15px", color: "#4ade80" }}>{product.price.toLocaleString()} ₫</td>
                <td style={{ padding: "15px" }}>{product.stock}</td>
                <td style={{ padding: "15px", display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button onClick={() => handleEditClick(product)} style={{ background: "transparent", color: "#eab308", border: "none", cursor: "pointer" }}><Edit2 size={18} /></button>
                  <button style={{ background: "transparent", color: "#ef4444", border: "none", cursor: "pointer" }}><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODAL CHỈNH SỬA --- */}
      {editingProduct && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ background: "#1a1a1a", padding: "30px", borderRadius: "12px", width: "400px", border: "1px solid #333" }}>
            <h3 style={{ marginTop: 0, color: "#fff" }}>Chỉnh sửa Sản phẩm</h3>
            
            <div style={{ marginBottom: "15px" }}>
              <label style={{ color: "#a3a3a3", fontSize: "0.9rem", display: "block", marginBottom: "5px" }}>Tên sản phẩm</label>
              <input type="text" value={editingProduct.name} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} style={{ width: "100%", padding: "10px", background: "#222", border: "1px solid #444", color: "#fff", borderRadius: "8px", boxSizing: "border-box" }} />
            </div>

            <div style={{ marginBottom: "15px", display: "flex", gap: "10px" }}>
              <div style={{ flex: 1 }}>
                <label style={{ color: "#a3a3a3", fontSize: "0.9rem", display: "block", marginBottom: "5px" }}>Giá bán</label>
                <input type="number" value={editingProduct.price} onChange={(e) => setEditingProduct({...editingProduct, price: Number(e.target.value)})} style={{ width: "100%", padding: "10px", background: "#222", border: "1px solid #444", color: "#fff", borderRadius: "8px", boxSizing: "border-box" }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ color: "#a3a3a3", fontSize: "0.9rem", display: "block", marginBottom: "5px" }}>Số lượng</label>
                <input type="number" value={editingProduct.stock} onChange={(e) => setEditingProduct({...editingProduct, stock: Number(e.target.value)})} style={{ width: "100%", padding: "10px", background: "#222", border: "1px solid #444", color: "#fff", borderRadius: "8px", boxSizing: "border-box" }} />
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ color: "#a3a3a3", fontSize: "0.9rem", display: "block", marginBottom: "5px" }}>URL Hình ảnh</label>
              <input type="text" value={editingProduct.image} onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})} style={{ width: "100%", padding: "10px", background: "#222", border: "1px solid #444", color: "#fff", borderRadius: "8px", boxSizing: "border-box" }} />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => setEditingProduct(null)} style={{ padding: "10px 15px", background: "#333", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}>Hủy</button>
              <button onClick={handleSave} style={{ padding: "10px 15px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}>Lưu thay đổi</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;