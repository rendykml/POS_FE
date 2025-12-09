import DashboardLayout from "../../layouts/DashboardLayout";
import { BarChart3, Package, AlertTriangle, ShoppingBag } from "lucide-react";

export default function DashboardAdmin() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>

      {/* CARD STATISTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow p-6 rounded-xl flex items-center gap-4">
          <ShoppingBag className="text-blue-500" size={36} />
          <div>
            <p className="text-gray-500">Penjualan Hari Ini</p>
            <h2 className="text-2xl font-bold">Rp 1.250.000</h2>
          </div>
        </div>

        <div className="bg-white shadow p-6 rounded-xl flex items-center gap-4">
          <Package className="text-green-500" size={36} />
          <div>
            <p className="text-gray-500">Total Produk</p>
            <h2 className="text-2xl font-bold">120 Item</h2>
          </div>
        </div>

        <div className="bg-white shadow p-6 rounded-xl flex items-center gap-4">
          <AlertTriangle className="text-red-500" size={36} />
          <div>
            <p className="text-gray-500">Stok Menipis</p>
            <h2 className="text-2xl font-bold">8 Produk</h2>
          </div>
        </div>
      </div>

      {/* CHART DUMMY */}
      <div className="bg-white shadow p-6 rounded-xl mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <BarChart3 /> Grafik Penjualan Mingguan
        </h2>

        <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
          Chart Placeholder
        </div>
      </div>

      {/* LOW STOCK TABLE */}
      <div className="bg-white shadow p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Produk Stok Menipis</h2>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2">Produk</th>
              <th className="p-2">Stok</th>
              <th className="p-2">Kategori</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">Kemeja Polos</td>
              <td className="p-2 text-red-500 font-bold">3</td>
              <td className="p-2">Atasan</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">Celana Jeans</td>
              <td className="p-2 text-red-500 font-bold">2</td>
              <td className="p-2">Bawahan</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
