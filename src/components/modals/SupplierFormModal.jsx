import { useEffect, useState } from "react";
import api from "../../services/api";
import Button from "../ui/button";

export default function SupplierFormModal({
  isOpen,
  supplier,
  onClose,
  onSuccess,
}) {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (supplier) setForm(supplier);
  }, [supplier]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (supplier) {
        await api.put(`/admin/suppliers/${supplier.id}`, form);
    } else {
        await api.post(`/admin/suppliers`, form);
    }

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h3 className="font-semibold mb-4">
          {supplier ? "Edit Supplier" : "Tambah Supplier"}
        </h3>

        {["name", "contact", "email", "address"].map((field) => (
          <input
            key={field}
            placeholder={field}
            className="w-full mb-2 border p-2"
            value={form[field] || ""}
            onChange={(e) =>
              setForm({ ...form, [field]: e.target.value })
            }
          />
        ))}

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={handleSubmit}>Simpan</Button>
        </div>
      </div>
    </div>
  );
}
