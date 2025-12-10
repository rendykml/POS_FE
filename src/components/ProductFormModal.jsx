import { X } from "lucide-react";

export default function ProductFormModal({ open, onClose, formData, setFormData, onSubmit, categories }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg relative">

        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">
          {formData.id ? "Edit Produk" : "Tambah Produk"}
        </h2>

        <div className="space-y-4">

          {/* Nama Produk */}
          <div>
            <label className="block mb-1 font-semibold">Nama Produk</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Harga Beli */}
          <div>
            <label className="block mb-1 font-semibold">Harga Beli</label>
            <input
              type="number"
              value={formData.cost}
              onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Harga Jual */}
          <div>
            <label className="block mb-1 font-semibold">Harga Jual</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="block mb-1 font-semibold">Kategori</label>
            <select
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              className="w-full border p-2 rounded"
            >
              <option value="">Pilih kategori</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Stok */}
          <div>
            <label className="block mb-1 font-semibold">Stok Awal</label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="w-full border p-2 rounded"
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
