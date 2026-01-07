import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button";
import Alert from "../ui/alert";

export default function UserFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  loading = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role_id: "",
  });

  // 🔔 alert state
  const [alert, setAlert] = useState(null);
  // alert = { variant, title, message }

  /* ======================
     SYNC DATA (EDIT / ADD)
  ====================== */
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        password: "", // password kosong saat edit
        role_id: initialData.role?.id || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
        role_id: "",
      });
    }

    setAlert(null);
  }, [initialData, isOpen]);

  /* ======================
     HANDLER
  ====================== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ======================
     VALIDASI
  ====================== */
  const validateForm = () => {
    if (!formData.name.trim()) {
      setAlert({
        variant: "error",
        title: "Validasi Gagal",
        message: "Nama wajib diisi.",
      });
      return false;
    }

    if (!formData.email.trim()) {
      setAlert({
        variant: "error",
        title: "Validasi Gagal",
        message: "Email wajib diisi.",
      });
      return false;
    }

    if (!initialData && !formData.password.trim()) {
      setAlert({
        variant: "error",
        title: "Validasi Gagal",
        message: "Password wajib diisi untuk user baru.",
      });
      return false;
    }

    if (!formData.role_id) {
      setAlert({
        variant: "error",
        title: "Validasi Gagal",
        message: "Role wajib dipilih.",
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

    try {
      // kirim data ke parent (UserPage)
      await onSubmit(formData);
    } catch (err) {
      setAlert({
        variant: "error",
        title: "Gagal Menyimpan",
        message:
          err?.response?.data?.message ||
          "Terjadi kesalahan pada server.",
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
        {/* ================= HEADER ================= */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            {initialData ? "Edit User" : "Tambah User"}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {initialData
              ? "Perbarui informasi user"
              : "Tambahkan user baru ke sistem"}
          </p>
        </div>

        {/* ================= ALERT ================= */}
        {alert && (
          <Alert
            variant={alert.variant}
            title={alert.title}
            message={alert.message}
          />
        )}

        {/* ================= FORM ================= */}
        <div className="space-y-5">
          {/* NAMA */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-500">
              Nama
            </label>
            <input
              disabled={loading}
              type="text"
              name="name"
              placeholder="Nama lengkap"
              value={formData.name}
              onChange={handleChange}
              className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm dark:bg-gray-900 dark:text-white/90"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-500">
              Email
            </label>
            <input
              disabled={loading}
              type="email"
              name="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
              className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm dark:bg-gray-900 dark:text-white/90"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-500">
              Password
            </label>
            <input
              disabled={loading}
              type="password"
              name="password"
              placeholder={
                initialData
                  ? "Kosongkan jika tidak diubah"
                  : "Password user"
              }
              value={formData.password}
              onChange={handleChange}
              className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm dark:bg-gray-900 dark:text-white/90"
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-500">
              Role
            </label>
            <select
              disabled={loading}
              name="role_id"
              value={formData.role_id}
              onChange={handleChange}
              className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm dark:bg-gray-900 dark:text-white/90"
            >
              <option value="">Pilih role</option>
              {/* NOTE:
                 option role sebaiknya dari API /admin/roles
              */}
              <option value="1">Admin</option>
              <option value="2">Kasir</option>
            </select>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Batal
          </Button>

          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading
              ? "Menyimpan..."
              : initialData
              ? "Simpan Perubahan"
              : "Tambah User"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
