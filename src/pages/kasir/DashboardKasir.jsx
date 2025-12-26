
import { ShoppingCart, History, BarChart3 } from "lucide-react";

export default function DashboardKasir() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Dashboard Kasir</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow p-6 rounded-xl flex items-center gap-4">
          <ShoppingCart className="text-blue-500" size={36} />
          <div>
            <p className="text-gray-500">Transaksi Hari Ini</p>
            <h2 className="text-2xl font-bold">32 Transaksi</h2>
          </div>
        </div>

        <div className="bg-white shadow p-6 rounded-xl flex items-center gap-4">
          <History className="text-green-500" size={36} />
          <div>
            <p className="text-gray-500">Total Penjualan</p>
            <h2 className="text-2xl font-bold">Rp 8.200.000</h2>
          </div>
        </div>
      </div>

      <button className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
        Mulai Transaksi
      </button>

      <div className="mt-8 bg-white shadow p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-3">Riwayat Transaksi</h2>
        <p className="text-gray-500">(Mock data, backend menyusul)</p>
      </div>
    </>
  );
}
