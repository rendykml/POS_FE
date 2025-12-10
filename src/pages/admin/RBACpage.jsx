import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import Swal from "sweetalert2";

export default function RBACPage() {
  // Dummy roles
  const roles = ["admin", "kasir", "gudang"];

  // Dummy menus (nanti dihubungkan ke backend)
  const menus = [
    { id: 1, name: "Dashboard" },
    { id: 2, name: "Manajemen Produk" },
    { id: 3, name: "Manajemen Kategori" },
    { id: 4, name: "Stok Masuk" },
    { id: 5, name: "Stok Keluar" },
    { id: 6, name: "Transaksi Penjualan" },
    { id: 7, name: "Laporan Penjualan" },
    { id: 8, name: "Notifikasi" },
    { id: 9, name: "Manajemen User" },
  ];

  // Dummy RBAC matrix
  const [access, setAccess] = useState({
    admin: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true },
    kasir: { 1: true, 6: true, 7: true, 8: true },
    gudang: { 1: true, 4: true, 5: true, 8: true },
  });

  const toggleAccess = (role, menuId) => {
    setAccess((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [menuId]: !prev[role][menuId],
      },
    }));
  };

  const saveChanges = () => {
    Swal.fire({
      icon: "success",
      title: "RBAC Disimpan",
      text: "Pengaturan hak akses berhasil diperbarui!",
    });

    console.log("Data terkirim ke backend:", access);
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Role-Based Access Control (RBAC)</h1>

      <div className="bg-white p-6 shadow rounded-xl">

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 text-left">Menu</th>
              {roles.map((role) => (
                <th key={role} className="p-3 capitalize">{role}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {menus.map((m) => (
              <tr key={m.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{m.name}</td>

                {roles.map((role) => (
                  <td key={role} className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={!!access[role][m.id]}
                      onChange={() => toggleAccess(role, m.id)}
                      className="w-5 h-5 accent-cyan-600 cursor-pointer"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 text-right">
          <button
            onClick={saveChanges}
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>

    </DashboardLayout>
  );
}
