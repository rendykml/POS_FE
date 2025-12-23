import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button";
import Alert from "../ui/alert";
import api from "../../services/api";
import Input from "../form/Input";

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
  const [errors, setErrors] = useState({});

  /* ======================
     FETCH CATEGORY
  ====================== */
  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data.data || []);
  };

  useEffect(() => {
    if (!isOpen) return;

    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        const list = Array.isArray(res.data) ? res.data : res.data.data;

        setCategories(list || []);
      } catch (err) {
        setCategories([]);
      }
    };

    fetchCategories();
  }, [isOpen]);

  /* ======================
     INIT FORM
  ====================== */
  useEffect(() => {
    if (!isOpen) return;
    if (categories.length === 0) return;

    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        category_id: initialData.category?.id || "",
        name: initialData.name || "",
        price: initialData.price || "",
        cost: initialData.cost || "",
        stock: initialData.stock || "",
        low_stock_threshold: initialData.low_stock_threshold || "",
      }));
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

    // reset UI state
    setErrors({});
    setAlert(null);
  }, [initialData, categories, isOpen]);

  /* ======================
     HANDLER
  ====================== */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  /* ======================
     VALIDATION
  ====================== */
  const validateField = (name, value) => {
    let message = "";

    switch (name) {
      case "category_id":
        if (!value) message = "Kategori wajib dipilih";
        break;

      case "name":
        if (!value.trim()) message = "Nama produk wajib diisi";
        else if (value.length < 3) message = "Nama produk minimal 3 karakter";
        break;

      case "price":
        if (value === "") message = "Harga wajib diisi";
        else if (Number(value) < 0) message = "Harga tidak boleh negatif";
        break;

      case "cost":
        if (value === "") message = "Modal wajib diisi";
        else if (Number(value) < 0) message = "Modal tidak boleh negatif";
        break;

      case "stock":
        if (value === "") message = "Stok wajib diisi";
        else if (Number(value) < 0) message = "Stok tidak boleh negatif";
        break;

      case "low_stock_threshold":
        if (value === "") message = "Batas stok wajib diisi";
        else if (Number(value) < 0) message = "Batas stok tidak boleh negatif";

        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: message,
    }));

    return !message;
  };

  const validateForm = () => {
    const fields = [
      "category_id",
      "name",
      "price",
      "cost",
      "stock",
      "low_stock_threshold",
    ];

    let valid = true;
    fields.forEach((f) => {
      if (!validateField(f, formData[f])) valid = false;
    });

    return valid;
  };

  /* ======================
     SUBMIT
  ====================== */

  const handleSubmit = async () => {
    if (!validateForm()) {
      setAlert({
        variant: "error",
        title: "Form Tidak Valid",
        message: "Periksa kembali input yang bertanda merah.",
      });
      return;
    }

    setAlert(null);

    try {
      await onSubmit(formData);
    } catch (err) {
      setAlert({
        variant: "error",
        title: "Gagal Menyimpan",
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Gagal terhubung ke server",
      });
    }
  };

  const handleClose = () => {
    setErrors({});
    setAlert(null);
    onClose();
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
            <select
              name="category_id"
              disabled={loading}
              value={formData.category_id}
              onChange={handleChange}
              className={`
      h-11 w-full rounded-lg border appearance-none px-4 pr-10 text-sm
      shadow-theme-xs focus:outline-hidden focus:ring-3
      bg-transparent text-gray-800 placeholder:text-gray-400

      dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30

      ${
        errors.category_id
          ? "border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:border-error-500"
          : formData.category_id
          ? "border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:border-success-500"
          : "border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
      }

      ${
        loading
          ? "bg-gray-100 text-gray-500 cursor-not-allowed opacity-60 dark:bg-gray-800 dark:text-gray-400"
          : ""
      }
    `}
            >
              <option value="">-- Pilih Kategori --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* HINT */}
            {errors.category_id && (
              <p className="mt-1.5 text-xs text-error-500">
                {errors.category_id}
              </p>
            )}
          </div>

          {/* NAMA */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-500 dark:text-gray-400">
              Nama Produk
            </label>
            <Input
              type="text"
              name="name"
              placeholder="Contoh: Kemeja Batik"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              error={!!errors.name}
              success={!errors.name && formData.name !== ""}
              hint={errors.name}
            />
          </div>

          {/* PRICE & COST */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-500 dark:text-gray-400">
                Harga Jual
              </label>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                disabled={loading}
                error={!!errors.price}
                success={!errors.price && formData.price !== ""}
                hint={errors.price}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-500 dark:text-gray-400">
                Harga Modal
              </label>
              <Input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                disabled={loading}
                error={!!errors.cost}
                success={!errors.cost && formData.cost !== ""}
                hint={errors.cost}
              />
            </div>
          </div>

          {/* STOCK */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-500 dark:text-gray-400">
                Stok
              </label>
              <Input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                disabled={loading}
                error={!!errors.stock}
                success={!errors.stock && formData.stock !== ""}
                hint={errors.stock}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-500 dark:text-gray-400">
                Batas Stok Minimum
              </label>
              <Input
                type="number"
                name="low_stock_threshold"
                value={formData.low_stock_threshold}
                onChange={handleChange}
                disabled={loading}
                error={!!errors.low_stock_threshold}
                success={
                  !errors.low_stock_threshold &&
                  formData.low_stock_threshold !== ""
                }
              />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={handleClose} disabled={loading}>
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
