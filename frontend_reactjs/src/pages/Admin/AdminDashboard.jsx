import React from "react";
import { Download, TrendingUp, DollarSign, ShoppingBag } from "lucide-react";
import * as XLSX from "xlsx";

const monthlyRevenueData = [
  { name: "Tháng 1", revenue: 120000000, profit: 45000000 },
  { name: "Tháng 2", revenue: 150000000, profit: 55000000 },
  { name: "Tháng 3", revenue: 180000000, profit: 70000000 },
  { name: "Tháng 4", revenue: 130000000, profit: 48000000 },
];

const maxRevenue = Math.max(...monthlyRevenueData.map((d) => d.revenue));

const AdminDashboard = () => {
  const handleExportData = () => {
    const ws = XLSX.utils.json_to_sheet(
      monthlyRevenueData.map((item) => ({
        Tháng: item.name,
        "Doanh thu (VNĐ)": item.revenue,
        "Lợi nhuận (VNĐ)": item.profit,
      })),
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Doanh Thu");
    XLSX.writeFile(wb, "Bao_Cao_Doanh_Thu_ShopRunner.xlsx");
  };

  return (
    <div className="dashboard-wrapper">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2>Tổng quan hệ thống</h2>
        <button
          onClick={handleExportData}
          style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 15px", background: "#22c55e", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}
        >
          <Download size={18} /> Xuất báo cáo Excel
        </button>
      </div>

      {/* Thẻ thống kê */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "30px" }}>
        {[
          { icon: <DollarSign size={20} color="#22c55e" />, label: "Tổng doanh thu quý này", value: "580,000,000 đ" },
          { icon: <TrendingUp size={20} color="#3b82f6" />, label: "Lợi nhuận ước tính", value: "218,000,000 đ" },
          { icon: <ShoppingBag size={20} color="#eab308" />, label: "Đơn hàng thành công", value: "1,245 Đơn" },
        ].map((card, idx) => (
          <div key={idx} style={{ background: "#1a1a1a", padding: "20px", borderRadius: "12px", border: "1px solid #333" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#a3a3a3" }}>
              {card.icon} {card.label}
            </div>
            <h3 style={{ fontSize: "24px", margin: "10px 0 0 0" }}>{card.value}</h3>
          </div>
        ))}
      </div>

      {/* Biểu đồ CSS */}
      <div style={{ background: "#1a1a1a", padding: "20px", borderRadius: "12px", border: "1px solid #333" }}>
        <h3 style={{ marginBottom: "20px" }}>Biểu đồ Doanh thu & Lợi nhuận (Theo tháng)</h3>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "24px", height: "250px", padding: "0 16px" }}>
          {monthlyRevenueData.map((item, idx) => (
            <div key={idx} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", height: "100%" }}>
              <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: "6px", width: "100%" }}>
                {/* Doanh thu */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
                  <span style={{ fontSize: "10px", color: "#a3a3a3", marginBottom: "4px" }}>
                    {(item.revenue / 1000000).toFixed(0)}M
                  </span>
                  <div style={{
                    width: "100%",
                    height: `${(item.revenue / maxRevenue) * 100}%`,
                    background: "#3b82f6",
                    borderRadius: "4px 4px 0 0",
                    minHeight: "4px",
                  }} />
                </div>
                {/* Lợi nhuận */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
                  <span style={{ fontSize: "10px", color: "#a3a3a3", marginBottom: "4px" }}>
                    {(item.profit / 1000000).toFixed(0)}M
                  </span>
                  <div style={{
                    width: "100%",
                    height: `${(item.profit / maxRevenue) * 100}%`,
                    background: "#22c55e",
                    borderRadius: "4px 4px 0 0",
                    minHeight: "4px",
                  }} />
                </div>
              </div>
              <span style={{ fontSize: "12px", color: "#a3a3a3", marginTop: "8px" }}>{item.name}</span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: "20px", marginTop: "16px", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "12px", height: "12px", background: "#3b82f6", borderRadius: "2px" }} />
            <span style={{ fontSize: "13px", color: "#a3a3a3" }}>Doanh thu</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "12px", height: "12px", background: "#22c55e", borderRadius: "2px" }} />
            <span style={{ fontSize: "13px", color: "#a3a3a3" }}>Lợi nhuận</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;