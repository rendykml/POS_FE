import { X } from "lucide-react";

const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

export default function CategoryFormModal({
  open,
  onClose,
  formData,
  setFormData,
  onSubmit,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">
          {formData.id ? "Edit Kategori" : "Tambah Kategori"}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Nama Kategori</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                const name = e.target.value;
                setFormData({
                  ...formData,
                  name,
                  slug: slugify(name),
                });
              }}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Slug</label>
            <input
              type="text"
              value={formData.slug}
              disabled
              className="w-full border p-2 rounded bg-gray-100 text-gray-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Deskripsi</label>
            <textarea
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full border p-2 rounded"
              rows={3}
            />

            <button
              onClick={onSubmit}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
