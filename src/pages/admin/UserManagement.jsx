import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import UserFormModal from "../../components/UserFormModal";
import Swal from "sweetalert2";
import { Pencil, Trash2, UserPlus } from "lucide-react";

export default function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: "Admin Sistem", username: "admin", role: "admin" },
    { id: 2, name: "Kasir Utama", username: "kasir1", role: "kasir" },
    { id: 3, name: "Petugas Gudang", username: "gudang1", role: "gudang" },
  ]);

  const [openModal, setOpenModal] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    username: "",
    password: "",
    role: "",
  });

  const openAddModal = () => {
    setFormData({ id: null, name: "", username: "", password: "", role: "" });
    setOpenModal(true);
  };

  const openEditModal = (user) => {
    setFormData(user);
    setOpenModal(true);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.username || !formData.role) {
      Swal.fire("Error", "Semua field wajib diisi!", "error");
      return;
    }

    // Add user
    if (!formData.id) {
      const newUser = {
        ...formData,
        id: Date.now(),
      };

      setUsers([...users, newUser]);
      Swal.fire("Berhasil", "User baru berhasil ditambahkan!", "success");
    }
    // Edit user
    else {
      const updated = users.map((u) => (u.id === formData.id ? formData : u));

      setUsers(updated);
      Swal.fire("Berhasil", "Data user berhasil diperbarui!", "success");
    }

    setOpenModal(false);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus user?",
      text: "User yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(users.filter((u) => u.id !== id));
        Swal.fire("Berhasil", "User telah dihapus!", "success");
      }
    });
  };

  return (
  <>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Manajemen User</h1>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg"
        >
          <UserPlus size={18} /> Tambah User
        </button>
      </div>

      {/* TABLE USER */}
      <div className="bg-white shadow p-4 rounded-xl">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-2 text-left">Nama</th>
              <th className="p-2 text-left">Username</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.username}</td>
                <td className="p-2 capitalize">{u.role}</td>

                <td className="p-2 flex gap-3">
                  <button
                    onClick={() => openEditModal(u)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(u.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <UserFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />
    </>
  );
}
