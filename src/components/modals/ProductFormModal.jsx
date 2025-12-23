import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button";
import Alert from "../ui/alert";
import api from "../../services/api";

export default function ProductFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  loading = false,
}) {
  const [formData, setFormData] = useState({
    category_id: "",
    name: "",
    price: "",
    cost: "",
    stock: "",
    low_stock_threshold: "",
  });

  const [categories, setCategories] = useState([]);
  const [alert, setAlert] = useState(null);

  /* ======================
     FETCH CATEGORY
  ====================== */
  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data.data || []);
  };

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  /* ======================
     INIT FORM
  ====================== */
  useEffect(() => {
    if (initialData) {
      setFormData({
        category_id: initialData.category?.id || "",
        name: initialData.name || "",
        price: initialData.price || "",
        cost: initialData.cost || "",
        stock: initialData.stock || "",
        low_stock_threshold: initialData.low_stock_threshold || "",
      });
    } else {
      setFormData({
        category_id: "",
        name: "",
        price: "",
        cost: "",
        stock: "",
        low_stock_threshold: "",
      });
    }

    setAlert(null);
  }, [initialData, isOpen]);

  /* ======================
     HANDLER
  ====================== */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ======================
     VALIDATION
  ====================== */
  const validateForm = () => {
    if (!formData.category_id) {
      setAlert({
        variant: "error",
        title: "Validasi Gagal",
        message: "Kategori wajib dipilih",
      });
      return false;
    }

    if (!formData.name.trim()) {
      setAlert({
        variant: "error",
        title: "Validasi Gagal",
        message: "Nama produk wajib diisi",
      });
      return false;
    }

    if (formData.price < 0 || formData.cost < 0) {
      setAlert({
        variant: "error",
        title: "Validasi Gagal",
        message: "Harga dan modal tidak boleh negatif",
      });
      return false;
    }

    if (formData.stock < 0 || formData.low_stock_threshold < 0) {
      setAlert({
        variant: "error",
        title: "Validasi Gagal",
        message: "Stok tidak boleh negatif",
      });
      return false;
    }

    return true;
  };

  /* ======================
     SUBMIT
  ====================== */
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setAlert(null);
    await onSubmit(formData, setAlert);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={loading ? undefined : onClose}
      className="max-w-[700px] p-6 lg:p-8"
    >
      <div className="flex flex-col gap-6">
        {/* HEADER */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            {initialData ? "Edit Produk" : "Tambah Produk"}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {initialData ? "Perbarui informasi produk" : "Masukan produk baru"}
          </p>
        </div>

        {/* ALERT */}
        {alert && (
          <Alert
            variant={alert.variant}
            title={alert.title}
            message={alert.message}
          />
        )}

        {/* FORM */}
        <div className="space-y-5">
          {/* KATEGORI */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-500 dark:text-gray-400">
              Kategori
            </label>
            <select
              name="category_id"
              disabled={loading}
              value={formData.category_id}
              onChange={handleChange}
              className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            >
              <option value="">-- Pilih Kategori --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* NAMA */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-500 dark:text-gray-400">
              Nama Produk
            </label>
            <input
              type="text"
              name="name"
              disabled={loading}
              value={formData.name}
              onChange={handleChange}
              placeholder="Contoh: Kemeja Batik"
              className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />
          </div>

          {/* PRICE & COST */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-500 dark:text-gray-400">
                Harga Jual
              </label>
              <input
                type="number"
                name="price"
                disabled={loading}
                value={formData.price}
                onChange={handleChange}
                className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-500 dark:text-gray-400">
                Harga Modal
              </label>
              <input
                type="number"
                name="cost"
                disabled={loading}
                value={formData.cost}
                onChange={handleChange}
                className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>
          </div>

          {/* STOCK */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-500 dark:text-gray-400">
                Stok
              </label>
              <input
                type="number"
                name="stock"
                disabled={loading}
                value={formData.stock}
                onChange={handleChange}
                className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-500 dark:text-gray-400">
                Batas Stok Minimum
              </label>
              <input
                type="number"
                name="low_stock_threshold"
                disabled={loading}
                value={formData.low_stock_threshold}
                onChange={handleChange}
                className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Batal
          </Button>

          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading
              ? "Menyimpan..."
              : initialData
              ? "Simpan Perubahan"
              : "Tambah Produk"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
