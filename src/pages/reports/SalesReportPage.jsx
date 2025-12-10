import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Filter, BarChart3, DollarSign, ShoppingBag } from "lucide-react";

export default function SalesReportPage() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Dummy transaksi penjualan
  const sales = [
    { id: 1, date: "2025-01-01", invoice: "INV001", customer: "Umum", total: 150000 },
    { id: 2, date: "2025-01-01", invoice: "INV002", customer: "Umum", total: 220000 },
    { id: 3, date: "2025-01-02", invoice: "INV003", customer: "Umum", total: 180000 },
  ];

  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Laporan Penjualan</h1>

      {/* FILTER */}
      <div className="bg-white p-4 mb-6 rounded-xl shadow flex items-end gap-4">
        <div>
          <label className="block text-sm font-semibold">Dari</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Sampai</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Filter size={18} /> Filter
        </button>
      </div>

      {/* SUMMARY CARD */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-5 shadow rounded-xl flex items-center gap-4">
          <ShoppingBag size={36} className="text-blue-500" />
          <div>
            <p className="text-gray-600">Total Transaksi</p>
            <h2 className="text-2xl font-bold">{sales.length}</h2>
          </div>
        </div>

        <div className="bg-white p-5 shadow rounded-xl flex items-center gap-4">
          <DollarSign size={36} className="text-green-500" />
          <div>
            <p className="text-gray-600">Total Pendapatan</p>
            <h2 className="text-2xl font-bold">Rp {totalRevenue.toLocaleString()}</h2>
          </div>
        </div>

        <div className="bg-white p-5 shadow rounded-xl flex items-center gap-4">
          <BarChart3 size={36} className="text-purple-500" />
          <div>
            <p className="text-gray-600">Top 1 Hari Ini</p>
            <h2 className="text-xl font-semibold">Kemeja Polos</h2>
          </div>
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-3">Daftar Penjualan</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-2 text-left">Tanggal</th>
              <th className="p-2 text-left">Invoice</th>
              <th className="p-2 text-left">Pelanggan</th>
              <th className="p-2 text-left">Total</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((s) => (
              <tr key={s.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{s.date}</td>
                <td className="p-2">{s.invoice}</td>
                <td className="p-2">{s.customer}</td>
                <td className="p-2 font-bold">
                  Rp {s.total.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </DashboardLayout>
  );
}
