import { useState } from "react";
import api from "../../services/api";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";
import { Pencil, Trash2, CheckCircle, Loader2 } from "lucide-react";

export default function SupplierTable({ suppliers = [], onEdit, onReload }) {
  const [loadingId, setLoadingId] = useState(null);

  const toggleStatus = async (supplier) => {
    const confirmText = supplier.is_active
      ? "Yakin ingin menonaktifkan supplier ini?"
      : "Yakin ingin mengaktifkan supplier ini?";

    if (!window.confirm(confirmText)) return;

    try {
      setLoadingId(supplier.id);

      if (supplier.is_active) {
        await api.delete(`/admin/suppliers/${supplier.id}`);
      } else {
        await api.put(`/admin/suppliers/${supplier.id}/activate`);
      }

      onReload?.();
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* ================= HEADER ================= */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Nama
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Kontak
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Email
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Aksi
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* ================= BODY ================= */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {suppliers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="px-5 py-6 text-center text-gray-500 dark:text-gray-400"
                >
                  Tidak ada data supplier
                </TableCell>
              </TableRow>
            ) : (
              suppliers.map((s) => {
                const isLoading = loadingId === s.id;

                return (
                  <TableRow
                    key={s.id}
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.03]"
                  >
                    {/* NAMA */}
                    <TableCell className="px-5 py-4 sm:px-5 text-start text-gray-800 text-theme-sm dark:text-white/90">
                      {s.name}
                    </TableCell>

                    {/* KONTAK */}
                    <TableCell className="px-5 py-4 sm:px-5 text-start text-gray-800 text-theme-sm dark:text-white/90">
                      {s.contact || "-"}
                    </TableCell>

                    {/* EMAIL */}
                    <TableCell className="px-5 py-4 sm:px-5 text-start text-gray-800 text-theme-sm dark:text-white/90">
                      {s.email || "-"}
                    </TableCell>

                    {/* STATUS */}
                    <TableCell className="px-4 py-3">
                      <Badge
                        size="sm"
                        color={s.is_active ? "success" : "error"}
                      >
                        {s.is_active ? "Aktif" : "Nonaktif"}
                      </Badge>
                    </TableCell>

                    {/* ACTION */}
                    <TableCell className="px-4 py-3">
                      <div className="flex gap-3 items-center">
                        <button
                          onClick={() => onEdit?.(s)}
                          className="text-blue-600 hover:text-blue-800"
                          disabled={isLoading}
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => toggleStatus(s)}
                          disabled={isLoading}
                          title={s.is_active ? "Nonaktifkan" : "Aktifkan"}
                          className={`${
                            s.is_active
                              ? "text-red-600 hover:text-red-800"
                              : "text-green-600 hover:text-green-800"
                          } disabled:opacity-50`}
                        >
                          {isLoading ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : s.is_active ? (
                            <Trash2 size={16} />
                          ) : (
                            <CheckCircle size={16} />
                          )}
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
