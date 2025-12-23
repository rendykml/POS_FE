import { useEffect, useState } from "react";
import api from "../../services/api";
import Swal from "sweetalert2";

import CategoryFormModal from "../../components/modals/CategoryFormModal";
import { useModal } from "../../hooks/useModal";

import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import CategoryTable from "../../components/tables/CategoryTable";
import Button from "../../components/ui/button";
import { Plus } from "lucide-react";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleAdd = () => {
    setSelectedCategory(null);
    setModalOpen(true);
  };

  const handleEdit = (cat) => {
    setSelectedCategory(cat);
    setModalOpen(true);
  };

  const handleSubmit = async (data, setError) => {
    try {
      setLoadingSubmit(true);

      if (selectedCategory) {
        await api.put(`/categories/${selectedCategory.id}`, data);
        Swal.fire("Berhasil", "Kategori diperbarui", "success");
      } else {
        await api.post("/categories", data);
        Swal.fire("Berhasil", "Kategori ditambahkan", "success");
      }

      setModalOpen(false);
      fetchCategories();
    } catch (err) {
      setError(
        err.response?.data?.message || "Terjadi kesalahan saat menyimpan data"
      );
    } finally {
      setLoadingSubmit(false);
    }
  };

  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Hapus kategori?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    await api.delete(`/categories/${id}`);
    fetchCategories();
    Swal.fire("Berhasil", "Kategori dihapus", "success");
  };

  return (
    <div>
      <PageMeta title="Manajemen Kategori | POS" />
      <PageBreadcrumb pageTitle="Manajemen Kategori" />
      <ComponentCard className="p-0">
        {/* HEADER CARD */}
        <div className="flex items-center pb-4 justify-between  border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            Daftar Kategori
          </h3>

          <Button
            size="sm"
            variant="primary"
            startIcon={<Plus size={16} />}
            onClick={handleAdd}
          >
            Tambah Kategori
          </Button>
        </div>

        <CategoryTable
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </ComponentCard>
      <CategoryFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={selectedCategory}
        onSubmit={handleSubmit}
        loading={loadingSubmit}
      />
    </div>
  );
}
