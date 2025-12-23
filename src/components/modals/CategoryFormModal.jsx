import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button";
import Alert from "../ui/alert"; // ⬅️ pakai alert

const generateSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export default function CategoryFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  loading = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });

  // 🔔 alert state
  const [alert, setAlert] = useState(null);
  // alert = { variant, title, message }

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        slug: generateSlug(initialData.name || ""),
        description: initialData.description || "",
      });
    } else {
      setFormData({ name: "", slug: "", description: "" });
    }

    setAlert(null);
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setFormData((prev) => ({
        ...prev,
        name: value,
        slug: generateSlug(value),
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ VALIDASI FORM
  const validateForm = () => {
    if (!formData.name.trim()) {
      setAlert({
        variant: "error",
        title: "Validasi Gagal",
        message: "Nama kategori wajib diisi.",
      });
      return false;
    }

    if (formData.name.trim().length < 3) {
      setAlert({
        variant: "warning",
        title: "Nama Terlalu Pendek",
        message: "Nama kategori minimal 3 karakter.",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setAlert(null);

    try {
      await onSubmit(formData, setAlert);
    } catch (err) {
      setAlert({
        variant: "error",
        title: "Gagal Menyimpan",
        message: err?.message || "Terjadi kesalahan pada server.",
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={loading ? undefined : onClose}
      className="max-w-[600px] p-6 lg:p-8"
    >
      <div className="flex flex-col gap-6">
        {/* HEADER */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            {initialData ? "Edit Kategori" : "Tambah Kategori"}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {initialData
              ? "Perbarui informasi kategori produk"
              : "Tambahkan kategori baru untuk produk"}
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
          {/* Nama */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-500 dark:text-gray-400">
              Nama Kategori
            </label>
            <input
              disabled={loading}
              type="text"
              name="name"
              placeholder="Contoh : Kemeja Pria"
              value={formData.name}
              onChange={handleChange}
              className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-500 dark:text-gray-400">
              Slug
            </label>
            <input
              readOnly
              value={formData.slug}
              placeholder="slug-kategori-akan-dibuat-otomatis"
              className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Deskripsi
            </label>
            <textarea
              disabled={loading}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="deskripsi kategori (opsional)"
              rows={4}
              className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />
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
              : "Tambah Kategori"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
