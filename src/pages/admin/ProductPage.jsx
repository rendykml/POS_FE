import { useEffect, useState } from "react";
import api from "../../services/api";
import Swal from "sweetalert2";

import ProductFormModal from "../../components/modals/ProductFormModal";

import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import ProductTable from "../../components/tables/ProductTable";
import Button from "../../components/ui/button";
import { Plus } from "lucide-react";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  /* ======================
     FETCH PRODUCTS
  ====================== */
  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ======================
     HANDLERS
  ====================== */
  const handleAdd = () => {
    setSelectedProduct(null);
    setModalOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleSubmit = async (data) => {
    try {
      setLoadingSubmit(true);

      if (selectedProduct) {
        await api.put(`/products/${selectedProduct.id}`, data);
        Swal.fire("Berhasil", "Produk diperbarui", "success");
      } else {
        await api.post("/products", data);
        Swal.fire("Berhasil", "Produk ditambahkan", "success");
      }

      setModalOpen(false);
      fetchProducts();
    } catch (err) {
      throw err; // ⬅️ WAJIB supaya modal bisa tampilkan alert
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Hapus produk?",
      text: "Produk yang dihapus tidak bisa dikembalikan",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    await api.delete(`/products/${id}`);
    fetchProducts();

    Swal.fire("Berhasil", "Produk dihapus", "success");
  };

  /* ======================
     RENDER
  ====================== */
  return (
    <div>
      <PageMeta title="Manajemen Produk | POS" />
      <PageBreadcrumb pageTitle="Manajemen Produk" />

      <ComponentCard className="p-0">
        {/* HEADER CARD */}
        <div className="flex items-center pb-4 justify-between border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            Daftar Produk
          </h3>

          <Button
            size="sm"
            variant="primary"
            startIcon={<Plus size={16} />}
            onClick={handleAdd}
          >
            Tambah Produk
          </Button>
        </div>

        {/* TABLE */}
        <ProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </ComponentCard>

      {/* MODAL */}
      <ProductFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={selectedProduct}
        onSubmit={handleSubmit}
        loading={loadingSubmit}
      />
    </div>
  );
}
