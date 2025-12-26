import DashboardLayout from "../../layouts/DashboardLayout";
import { PackagePlus, PackageMinus, AlertTriangle } from "lucide-react";

export default function DashboardGudang() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Dashboard Gudang</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow p-6 rounded-xl flex items-center gap-4">
          <PackagePlus className="text-blue-500" size={36} />
          <div>
            <p className="text-gray-500">Stok Masuk Hari Ini</p>
            <h2 className="text-2xl font-bold">15 Item</h2>
          </div>
        </div>

        <div className="bg-white shadow p-6 rounded-xl flex items-center gap-4">
          <PackageMinus className="text-red-500" size={36} />
          <div>
            <p className="text-gray-500">Stok Keluar Hari Ini</p>
            <h2 className="text-2xl font-bold">8 Item</h2>
          </div>
        </div>

        <div className="bg-white shadow p-6 rounded-xl flex items-center gap-4">
          <AlertTriangle className="text-yellow-500" size={36} />
          <div>
            <p className="text-gray-500">Stok Menipis</p>
            <h2 className="text-2xl font-bold">5 Produk</h2>
          </div>
        </div>
      </div>

      <div className="bg-white shadow p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Daftar Produk Stok Menipis</h2>
        <p className="text-gray-500">Mock Data – backend menyusul</p>
      </div>
    </>
  );
}
