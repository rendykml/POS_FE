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
  loading,
}) {
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setQty(1);
      setNote("");
      setError(null);
    }
  }, [isOpen, product]);

  const handleSubmit = async () => {
    try {
      await onSubmit({
        quantity: qty,
        note,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memproses stok");
    }
  };

  if (!isOpen || !product) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-lg font-semibold">
        Stock {type} – {product.name}
      </h3>

      <p className="text-sm text-gray-500">
        Stok saat ini: {product.stock}
      </p>

      {error && <Alert variant="error" message={error} />}

      <input
        type="number"
        min="1"
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        className="w-full h-10 border rounded px-3 mt-3"
      />

      <textarea
        placeholder="Catatan"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full border rounded px-3 py-2 mt-3"
      />

      <div className="flex justify-end gap-3 mt-4">
        <Button variant="outline" onClick={onClose}>
          Batal
        </Button>

        <Button
          variant={type === "OUT" ? "danger" : "primary"}
          onClick={handleSubmit}
          disabled={loading}
        >
          {type === "IN" ? "Tambah Stok" : "Kurangi Stok"}
        </Button>
      </div>
    </Modal>
  );
}
