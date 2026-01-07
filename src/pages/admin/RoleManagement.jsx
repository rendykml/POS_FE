import { useEffect, useState } from "react";
import api from "../../services/api";
import Swal from "sweetalert2";

import RoleFormModal from "../../components/modals/RoleFormModal";
import RoleTable from "../../components/tables/RoleTable";

import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button";
import { Plus } from "lucide-react";

export default function RolePage() {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  /* ======================
     FETCH ROLES
  ====================== */
  const fetchRoles = async () => {
    const res = await api.get("/admin/roles");
    setRoles(res.data.data);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  /* ======================
     HANDLERS
  ====================== */
  const handleAdd = () => {
    setSelectedRole(null);
    setModalOpen(true);
  };

  const handleEdit = (role) => {
    setSelectedRole(role);
    setModalOpen(true);
  };

  const handleSubmit = async (data) => {
    try {
      setLoadingSubmit(true);

      if (selectedRole) {
        await api.put(`/admin/roles/${selectedRole.id}`, data);
        Swal.fire("Berhasil", "Role diperbarui", "success");
      } else {
        await api.post("/admin/roles", data);
        Swal.fire("Berhasil", "Role ditambahkan", "success");
      }

      setModalOpen(false);
      fetchRoles();
    } catch (err) {
      throw err;
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Hapus role?",
      text: "Role yang dihapus tidak bisa dikembalikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
    });

    if (!confirm.isConfirmed) return;

    await api.delete(`/admin/roles/${id}`);
    fetchRoles();

    Swal.fire("Berhasil", "Role dihapus", "success");
  };

  /* ======================
     RENDER
  ====================== */
  return (
    <div>
      <PageMeta title="Manajemen Role | POS" />
      <PageBreadcrumb pageTitle="Manajemen Role" />

      <ComponentCard className="p-0">
        {/* HEADER */}
        <div className="flex items-center pb-4 justify-between border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-base font-medium text-gray-800 dark:text-white/90">
            Daftar Role
          </h2>

          <Button
            size="sm"
            variant="primary"
            startIcon={<Plus size={16} />}
            onClick={handleAdd}
          >
            Tambah Role
          </Button>
        </div>

        {/* TABLE */}
        <RoleTable
          roles={roles}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </ComponentCard>

      {/* MODAL */}
      <RoleFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={selectedRole}
        onSubmit={handleSubmit}
        loading={loadingSubmit}
      />
    </div>
  );
}
