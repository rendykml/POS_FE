import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button";
import Alert from "../ui/alert";
import api from "../../services/api";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function RoleAccessModal({
  isOpen,
  onClose,
  role,
}) {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  /* ======================
     FETCH ROLE ACCESS
  ====================== */
  const fetchAccess = async () => {
    if (!role) return;

    setLoading(true);
    try {
      const res = await api.get("/admin/role-access", {
        params: { role_id: role.id },
      });
      setMenus(res.data.menus);
    } catch (err) {
      setAlert({
        variant: "error",
        title: "Gagal Memuat",
        message: "Tidak dapat memuat hak akses role",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchAccess();
  }, [isOpen, role]);

  /* ======================
     HANDLER
  ====================== */
  const toggle = (menuId, field) => {
    setMenus((prev) =>
      prev.map((m) =>
        m.menu_id === menuId ? { ...m, [field]: !m[field] } : m
      )
    );
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setAlert(null);

      await api.post("/admin/role-access", {
        role_id: role.id,
        menus: menus.map((m) => ({
          menu_id: m.menu_id,
          can_view: !!m.can_view,
          can_create: !!m.can_create,
          can_update: !!m.can_update,
          can_delete: !!m.can_delete,
        })),
      });

      onClose();
    } catch (err) {
      setAlert({
        variant: "error",
        title: "Gagal Menyimpan",
        message:
          err?.response?.data?.message ||
          "Terjadi kesalahan pada server",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !role) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={loading ? undefined : onClose}
      className="max-w-[900px] p-6 lg:p-8"
    >
      <div className="flex flex-col gap-6">
        {/* HEADER */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            Hak Akses Role
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Role: <span className="font-medium">{role.name}</span>
          </p>
        </div>

        {alert && (
          <Alert
            variant={alert.variant}
            title={alert.title}
            message={alert.message}
          />
        )}

        {/* TABLE */}
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-white/[0.05]">
          <div className="max-w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {[
                    "Menu",
                    "View",
                    "Create",
                    "Update",
                    "Delete",
                  ].map((h) => (
                    <TableCell
                      key={h}
                      isHeader
                      className="px-5 py-3 text-theme-xs text-gray-500"
                    >
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y">
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="px-5 py-6 text-center">
                      Memuat data...
                    </TableCell>
                  </TableRow>
                ) : (
                  menus.map((m) => (
                    <TableRow key={m.menu_id}>
                      <TableCell className="px-5 py-4 font-medium">
                        {m.name}
                      </TableCell>

                      {[
                        "can_view",
                        "can_create",
                        "can_update",
                        "can_delete",
                      ].map((field) => (
                        <TableCell key={field} className="px-5 py-4">
                          <input
                            type="checkbox"
                            checked={!!m[field]}
                            onChange={() =>
                              toggle(m.menu_id, field)
                            }
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan Akses"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
