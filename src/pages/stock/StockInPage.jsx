import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import StockFormModal from "../../components/StockFormModal";
import Swal from "sweetalert2";
import { PlusCircle } from "lucide-react";

export default function StockInPage() {
  const productsDummy = [
    { id: 1, name: "Kemeja Polos" },
    { id: 2, name: "Celana Jeans" },
    { id: 3, name: "Jaket Hoodie" },
  ];

  const [stockIn, setStockIn] = useState([
    { id: 1, product: "Kemeja Polos", qty: 10, note: "Restock awal" },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    type: "in",
    product_id: "",
    qty: "",
    note: "",
  });

  const saveStock = () => {
    if (!formData.product_id || !formData.qty) {
      Swal.fire("Error", "Produk dan jumlah wajib diisi", "error");
      return;
    }

    const productName = productsDummy.find((p) => p.id == formData.product_id)?.name;

    const newData = {
      id: Date.now(),
      product: productName,
      qty: Number(formData.qty),
      note: formData.note,
    };

    setStockIn([...stockIn, newData]);

    Swal.fire("Berhasil", "Stok masuk ditambahkan!", "success");
    setOpenModal(false);
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Stok Masuk</h1>
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg"
        >
          <PlusCircle size={20} /> Tambah Stok Masuk
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow p-4 rounded-xl">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-2">Produk</th>
              <th className="p-2">Jumlah</th>
              <th className="p-2">Catatan</th>
            </tr>
          </thead>
          <tbody>
            {stockIn.map((s) => (
              <tr key={s.id} className="border-b">
                <td className="p-2">{s.product}</td>
                <td className="p-2">{s.qty}</td>
                <td className="p-2 text-gray-500">{s.note || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <StockFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={saveStock}
        products={productsDummy}
      />
    </DashboardLayout>
  );
}
