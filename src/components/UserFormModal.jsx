import { roles } from "../constants/role";
import { X } from "lucide-react";

export default function UserFormModal({
  open,
  onClose,
  onSubmit,
  formData,
  setFormData,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">

        {/* Close Button */}
        <button 
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">
          {formData.id ? "Edit User" : "Tambah User"}
        </h2>

        <div className="space-y-4">

          <div>
            <label className="block text-sm font-semibold mb-1">Nama</label>
            <input
              type="text"
              className="w-full border p-2 rounded-lg"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Username</label>
            <input
              type="text"
              className="w-full border p-2 rounded-lg"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>

          {!formData.id && (
            <div>
              <label className="block text-sm font-semibold mb-1">Password</label>
              <input
                type="password"
                className="w-full border p-2 rounded-lg"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold mb-1">Role</label>
            <select
              className="w-full border p-2 rounded-lg"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option value="">Pilih Role</option>
              {roles.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onSubmit}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg mt-4"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
