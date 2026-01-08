import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button";
import Alert from "../ui/alert";

export default function StockActionModal({
  isOpen,
  onClose,
  product,
  type, // "IN" | "OUT"
  onSubmit,
  loading = false,
}) {
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const [alert, setAlert] = useState(null);
  // alert = { variant, title, message }

  /* ======================
     RESET STATE
  ====================== */
  useEffect(() => {
    if (isOpen) {
      setQty(1);
      setNote("");
      setAlert(null);
    }
  }, [isOpen, product]);

  /* ======================
     SUBMIT
  ====================== */
  const handleSubmit = async () => {
    if (!qty || qty <= 0) {
      setAlert({
        variant: "error",
        title: "Validasi Gagal",
        message: "Jumlah stok harus lebih dari 0.",
      });
      return;
    }

    try {
      setAlert(null);
      await onSubmit({
        quantity: qty,
        note,
      });
    } catch (err) {
      setAlert({
        variant: "error",
        title: "Gagal Memproses",
        message:
          err?.response?.data?.message || "Terjadi kesalahan pada server.",
      });
    }
  };

  if (!isOpen || !product) return null;

  const isOut = type === "OUT";

  return (
    <Modal
      isOpen={isOpen}
      onClose={loading ? undefined : onClose}
      className="max-w-[520px] p-6 lg:p-8"
    >
      <div className="flex flex-col gap-6">
        {/* ================= HEADER ================= */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            {isOut ? "Kurangi Stok" : "Tambah Stok"}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {product.name} · Stok saat ini{" "}
            <span className="font-medium text-gray-700 dark:text-white/80">
              {product.stock}
            </span>
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
          {/* JUMLAH */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-500 dark:text-gray-400">
              Jumlah Stok
            </label>
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="h-11 w-full rounded-lg border px-4 text-sm"
              placeholder="Masukkan jumlah"
            />
          </div>

          {/* CATATAN */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-500 dark:text-gray-400">
              Catatan
            </label>
            <textarea
              disabled={loading}
              placeholder="Catatan tambahan (opsional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 dark:border-white/[0.05] dark:bg-white/[0.03] dark:text-white/90"
            />
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Batal
          </Button>

          <Button
            variant={isOut ? "danger" : "primary"}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Memproses..." : isOut ? "Kurangi Stok" : "Tambah Stok"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
