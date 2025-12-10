import { X } from "lucide-react";

export default function StockFormModal({ open, onClose, formData, setFormData, onSubmit, products }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md relative">

        <button onClick={onClose} className="absolute right-4 top-4 text-gray-500">
          <X size={22} />
        </button>

        <h2 className="text-xl font-bold mb-4">{formData.type === "in" ? "Tambah Stok Masuk" : "Tambah Stok Keluar"}</h2>

        <div className="space-y-4">

          <div>
            <label className="block text-sm font-semibold mb-1">Pilih Produk</label>
            <select
              value={formData.product_id}
              onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
              className="w-full border p-2 rounded"
            >
              <option value="">-- Pilih Produk --</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Jumlah</label>
            <input
              type="number"
              className="w-full border p-2 rounded"
              value={formData.qty}
              onChange={(e) => setFormData({ ...formData, qty: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Catatan (opsional)</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            />
          </div>

          <button
            onClick={onSubmit}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg"
          >
            Simpan
          </button>

        </div>
      </div>
    </div>
  );
}
