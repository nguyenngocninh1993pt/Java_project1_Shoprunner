import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Download, TrendingUp, DollarSign, ShoppingBag } from "lucide-react";
import * as XLSX from "xlsx"; // Bạn có thể tự thêm style để nó đẹp như ý muốn

// Giả lập dữ liệu API trả về từ backend (bảng Order)
const monthlyRevenueData = [
  { name: "Tháng 1", revenue: 120000000, profit: 45000000 },
  { name: "Tháng 2", revenue: 150000000, profit: 55000000 },
  { name: "Tháng 3", revenue: 180000000, profit: 70000000 },
  { name: "Tháng 4", revenue: 130000000, profit: 48000000 },
];

const AdminDashboard = () => {
  // Hàm xử lý xuất file Excel
  const handleExportData = () => {
    // 1. Tạo worksheet từ dữ liệu
    const ws = XLSX.utils.json_to_sheet(monthlyRevenueData.map(item => ({
      "Tháng": item.name,
      "Doanh thu (VNĐ)": item.revenue,
      "Lợi nhuận (VNĐ)": item.profit
    })));

    // 2. Tạo workbook và thêm worksheet vào
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Doanh Thu");

    // 3. Tải file xuống
    XLSX.writeFile(wb, "Bao_Cao_Doanh_Thu_ShopRunner.xlsx");
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>Tổng quan hệ thống</h2>
        <button onClick={handleExportData} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 15px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          <Download size={18} /> Xuất báo cáo Excel
        </button>
      </div>

      {/* Thẻ thống kê */}
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <div className="stat-card" style={{ background: '#1a1a1a', padding: '20px', borderRadius: '12px', border: '1px solid #333' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#a3a3a3' }}>
            <DollarSign size={20} color="#22c55e" /> Tổng doanh thu quý này
          </div>
          <h3 style={{ fontSize: '24px', margin: '10px 0 0 0' }}>580,000,000 đ</h3>
        </div>
        <div className="stat-card" style={{ background: '#1a1a1a', padding: '20px', borderRadius: '12px', border: '1px solid #333' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#a3a3a3' }}>
            <TrendingUp size={20} color="#3b82f6" /> Lợi nhuận ước tính
          </div>
          <h3 style={{ fontSize: '24px', margin: '10px 0 0 0' }}>218,000,000 đ</h3>
        </div>
        <div className="stat-card" style={{ background: '#1a1a1a', padding: '20px', borderRadius: '12px', border: '1px solid #333' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#a3a3a3' }}>
            <ShoppingBag size={20} color="#eab308" /> Đơn hàng thành công
          </div>
          <h3 style={{ fontSize: '24px', margin: '10px 0 0 0' }}>1,245 Đơn</h3>
        </div>
      </div>

      {/* Biểu đồ */}
      <div className="charts-section" style={{ background: '#1a1a1a', padding: '20px', borderRadius: '12px', border: '1px solid #333' }}>
        <h3>Biểu đồ Doanh thu & Lợi nhuận (Theo tháng)</h3>
        {/* Sửa height thành '400px' và thêm minHeight */}
<div style={{ width: '100%', height: '400px', minHeight: '400px', marginTop: '20px' }}>
  {/* Thêm width và height vào ResponsiveContainer */}
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={monthlyRevenueData}>
      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
      <XAxis dataKey="name" stroke="#a3a3a3" />
      <YAxis stroke="#a3a3a3" />
      <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#333' }} />
      <Legend />
      <Bar dataKey="revenue" name="Doanh thu" fill="#3b82f6" />
      <Bar dataKey="profit" name="Lợi nhuận" fill="#22c55e" />
    </BarChart>
  </ResponsiveContainer>
</div>
      </div>
    </div>
  );
};

export default AdminDashboard;