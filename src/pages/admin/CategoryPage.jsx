import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import Swal from "sweetalert2";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import CategoryFormModal from "../../components/CategoryFormModal";

export default function CategoryPage() {
  // Dummy data kategori
  const [categories, setCategories] = useState([
    { id: 1, name: "Atasan" },
    { id: 2, name: "Bawahan" },
    { id: 3, name: "Aksesoris" },
  ]);

  const [openModal, setOpenModal] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
  });

  const openAdd = () => {
    setFormData({ id: null, name: "" });
    setOpenModal(true);
  };

  const openEdit = (cat) => {
    setFormData(cat);
    setOpenModal(true);
  };

  const saveCategory = () => {
    if (!formData.name) {
      Swal.fire("Error", "Nama kategori tidak boleh kosong", "error");
      return;
    }

    // EDIT
    if (formData.id) {
      const updated = categories.map((c) =>
        c.id === formData.id ? formData : c
      );
      setCategories(updated);
      Swal.fire("Berhasil", "Kategori berhasil diperbarui!", "success");
    }
    // ADD
    else {
      const newCategory = { ...formData, id: Date.now() };
      setCategories([...categories, newCategory]);
      Swal.fire("Berhasil", "Kategori baru berhasil ditambahkan!", "success");
    }

    setOpenModal(false);
  };

  const deleteCategory = (id) => {
    Swal.fire({
      title: "Hapus kategori?",
      text: "Data tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        setCategories(categories.filter((c) => c.id !== id));
        Swal.fire("Berhasil!", "Kategori berhasil dihapus!", "success");
      }
    });
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Manajemen Kategori</h1>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg"
        >
          <PlusCircle size={20} /> Tambah Kategori
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow p-4 rounded-xl">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-2">Nama Kategori</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{c.name}</td>

                <td className="p-2 flex gap-3">
                  <button
                    onClick={() => openEdit(c)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => deleteCategory(c.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <CategoryFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={saveCategory}
      />
    </DashboardLayout>
  );
}
