import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import StockFormModal from "../../components/StockFormModal";
import Swal from "sweetalert2";
import { MinusCircle } from "lucide-react";

export default function StockOutPage() {
  const productsDummy = [
    { id: 1, name: "Kemeja Polos" },
    { id: 2, name: "Celana Jeans" },
  ];

  const [stockOut, setStockOut] = useState([
    { id: 1, product: "Celana Jeans", qty: 2, note: "Rusak" },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    type: "out",
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

    setStockOut([...stockOut, newData]);

    Swal.fire("Berhasil", "Stok keluar ditambahkan!", "success");
    setOpenModal(false);
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Stok Keluar</h1>
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          <MinusCircle size={20} /> Tambah Stok Keluar
        </button>
      </div>

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
            {stockOut.map((s) => (
              <tr key={s.id} className="border-b">
                <td className="p-2">{s.product}</td>
                <td className="p-2">{s.qty}</td>
                <td className="p-2 text-gray-500">{s.note || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
