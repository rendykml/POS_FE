import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button";
import Alert from "../ui/alert";

export default function RoleFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  loading = false,
}) {
  const [name, setName] = useState("");
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
    } else {
      setName("");
    }
    setAlert(null);
  }, [initialData, isOpen]);

  const handleSubmit = async () => {
    if (!name.trim()) {
      setAlert({
        variant: "error",
        title: "Validasi Gagal",
        message: "Nama role wajib diisi",
      });
      return;
    }

    try {
      await onSubmit({ name });
    } catch (err) {
      setAlert({
        variant: "error",
        title: "Gagal Menyimpan",
        message:
          err?.response?.data?.message ||
          "Terjadi kesalahan pada server",
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={loading ? undefined : onClose}
      className="max-w-[500px] p-6 lg:p-8"
    >
      <div className="flex flex-col gap-6">
        {/* HEADER */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            {initialData ? "Edit Role" : "Tambah Role"}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {initialData
              ? "Perbarui nama role"
              : "Tambahkan role baru"}
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
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-500">
            Nama Role
          </label>
          <input
            disabled={loading}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Admin"
            className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm dark:bg-gray-900 dark:text-white/90"
          />
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
              : "Tambah Role"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
