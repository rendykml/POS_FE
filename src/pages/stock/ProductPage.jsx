import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import ProductFormModal from "../../components/ProductFormModal";
import Swal from "sweetalert2";
import { Pencil, Trash2, PlusCircle } from "lucide-react";

export default function ProductPage2() {
  const categoriesDummy = [
    { id: 1, name: "Atasan" },
    { id: 2, name: "Bawahan" },
    { id: 3, name: "Aksesoris" },
  ];

  const [products, setProducts] = useState([
    { id: 1, name: "Kemeja Polos", cost: 60000, price: 120000, category_id: 1, stock: 10 },
    { id: 2, name: "Celana Jeans", cost: 90000, price: 200000, category_id: 2, stock: 5 },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    cost: "",
    price: "",
    category_id: "",
    stock: "",
  });

  const openAdd = () => {
    setFormData({ id: null, name: "", cost: "", price: "", category_id: "", stock: "" });
    setOpenModal(true);
  };

  const openEdit = (p) => {
    setFormData(p);
    setOpenModal(true);
  };

  const saveProduct = () => {
    if (!formData.name || !formData.price || !formData.category_id) {
      Swal.fire("Error", "Semua field wajib diisi", "error");
      return;
    }

    if (formData.id) {
      // Edit
      setProducts(products.map(p => p.id === formData.id ? formData : p));
      Swal.fire("Berhasil", "Produk berhasil diperbarui!", "success");
    } else {
      // Add
      const newProduct = { ...formData, id: Date.now() };
      setProducts([...products, newProduct]);
      Swal.fire("Berhasil", "Produk baru ditambahkan!", "success");
    }

    setOpenModal(false);
  };

  const deleteProduct = (id) => {
    Swal.fire({
      title: "Hapus produk?",
      text: "Data tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
    }).then((result) => {
      if (result.isConfirmed) {
        setProducts(products.filter((p) => p.id !== id));
        Swal.fire("Berhasil", "Produk dihapus!", "success");
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
                <td className="p-2">
                  {categoriesDummy.find((c) => c.id === p.category_id)?.name}
                </td>
                <td className="p-2">{p.stock}</td>

                <td className="p-2 flex gap-3">
                  <button onClick={() => openEdit(p)} className="text-blue-600 hover:text-blue-800">
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => deleteProduct(p.id)} className="text-red-600 hover:text-red-800">
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
        categories={categoriesDummy}
      />
    </DashboardLayout>
  );
}
