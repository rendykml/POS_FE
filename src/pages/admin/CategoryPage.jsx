import DashboardLayout from "../../layouts/DashboardLayout";
import Swal from "sweetalert2";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import CategoryFormModal from "../../components/CategoryFormModal";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const [openModal, setOpenModal] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    slug: "",
    description: "",
  });
  

  const openAdd = () => {
    setFormData({ id: null, name: "", description: "", slug: "" });
    setOpenModal(true);
  };

  const openEdit = (cat) => {
    setFormData(cat);
    setOpenModal(true);
  };

  const saveCategory = async () => {
    try {
      await api.post("/categories", {
        name: formData.name,
        description: formData.description || null,
        slug: formData.slug,
      });

      Swal.fire("Berhasil", "Kategori ditambahkan", "success");
      fetchCategories();
    } catch (err) {
      Swal.fire("Error", err.response.data.message, "error");
    }
  };
  const updateCategory = async () => {
    try {
      await api.put(`/categories/${formData.id}`, {
        name: formData.name,
        description: formData.description || null,
        slug: formData.slug,
      });

      Swal.fire("Berhasil", "Kategori diperbarui", "success");
      fetchCategories();
    } catch (err) {
      Swal.fire("Error", err.response.data.message, "error");
    }
  };
  const onSubmit = async () => {
    if (!formData.name) {
      Swal.fire("Error", "Nama kategori wajib diisi", "error");
      return;
    }

    if (formData.id) {
      await updateCategory();
    } else {
      await saveCategory();
    }

    setOpenModal(false);
  };

  const deleteCategory = async (id) => {
    Swal.fire({
      title: "Hapus kategori?",
      icon: "warning",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await api.delete(`/categories/${id}`);
        fetchCategories();
        Swal.fire("Berhasil", "Kategori dihapus", "success");
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
              <th className="p-2">Slug</th>
              <th className="p-2">Deskripsi</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{c.name}</td>
                <td className="p-2 text-gray-500">{c.slug}</td>
                <td className="p-2">{c.description || "-"}</td>

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
        onSubmit={onSubmit}
      />
    </DashboardLayout>
  );
}
