import DashboardLayout from "../../layouts/DashboardLayout";
import ProductFormModal from "../../components/ProductFormModal";
import Swal from "sweetalert2";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data.data);
  };
  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data.data);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    category_id: "",
    price: "",
    cost: "",
    stock: "",
    low_stock_threshold: "",
  });

  const openAdd = () => {
    setFormData({
      id: null,
      name: "",
      category_id: "",
      price: "",
      cost: "",
      stock: "",
      low_stock_threshold: "",
    });
    setOpenModal(true);
  };

  const openEdit = (p) => {
    setFormData({
      id: p.id,
      name: p.name,
      category_id: p.category_id,
      price: p.price,
      cost: p.cost,
      stock: p.stock,
      low_stock_threshold: p.low_stock_threshold,
    });
    setOpenModal(true);
  };

  const saveProduct = async () => {
    try {
      if (formData.id) {
        await api.put(`/products/${formData.id}`, {
          name: formData.name,
          price: formData.price,
          cost: formData.cost,
          stock: formData.stock,
          low_stock_threshold: formData.low_stock_threshold,
        });
        Swal.fire("Berhasil", "Produk diperbarui", "success");
      } else {
        await api.post("/products", {
          name: formData.name,
          category_id: formData.category_id,
          price: formData.price,
          cost: formData.cost,
          stock: formData.stock,
          low_stock_threshold: formData.low_stock_threshold,
        });
        Swal.fire("Berhasil", "Produk ditambahkan", "success");
      }

      setOpenModal(false);
      fetchProducts();
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Gagal menyimpan produk",
        "error"
      );
    }
  };

  const deleteProduct = async (id) => {
    Swal.fire({
      title: "Hapus produk?",
      icon: "warning",
      showCancelButton: true,
    }).then(async (res) => {
      if (res.isConfirmed) {
        await api.delete(`/products/${id}`);
        fetchProducts();
        Swal.fire("Berhasil", "Produk dihapus", "success");
      }
    });
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Manajemen Produk</h1>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg"
        >
          <PlusCircle size={20} /> Tambah Produk
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow p-4 rounded-xl">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-2">Nama</th>
              <th className="p-2">Harga Modal</th>
              <th className="p-2">Harga Jual</th>
              <th className="p-2">Kategori</th>
              <th className="p-2">Stok</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{p.name}</td>
                <td className="p-2">Rp {p.cost.toLocaleString()}</td>
                <td className="p-2">Rp {p.price.toLocaleString()}</td>
                <td className="p-2">{p.category?.name}</td>
                <td className="p-2">{p.stock}</td>

                <td className="p-2 flex gap-3">
                  <button
                    onClick={() => openEdit(p)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => deleteProduct(p.id)}
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

      {/* Modal */}
      <ProductFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={saveProduct}
        categories={categories}
      />
    </DashboardLayout>
  );
}
