import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { Pencil, Trash2 } from "lucide-react";

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function UserTable({ users = [], onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* ================= HEADER ================= */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Nama
              </TableCell>

              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Email
              </TableCell>

              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Role
              </TableCell>

              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Status
              </TableCell>

              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Dibuat
              </TableCell>

              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Aksi
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* ================= BODY ================= */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="px-5 py-6 text-center text-gray-500 dark:text-gray-400"
                >
                  Tidak ada data user
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow
                  key={user.id}
                  className="hover:bg-gray-50 dark:hover:bg-white/[0.03]"
                >
                  {/* NAMA */}
                  <TableCell className="px-5 py-4 sm:px-5 text-start text-gray-800 text-theme-sm dark:text-white/90  ">
                    {user.name}
                  </TableCell>

                  {/* EMAIL */}
                  <TableCell className="px-5 py-4 sm:px-5 text-start text-gray-800 text-theme-sm dark:text-white/90  ">
                    {user.email}
                  </TableCell>

                  {/* ROLE */}
                  <TableCell className="px-5 py-4 sm:px-5 text-start text-gray-800 text-theme-sm dark:text-white/90  ">
                    {user.role?.name || "-"}
                  </TableCell>

                  {/* STATUS */}
                  <TableCell className="px-4 py-3">
                    <Badge
                      size="sm"
                      color={user.is_active ? "success" : "error"}
                    >
                      {user.is_active ? "Aktif" : "Nonaktif"}
                    </Badge>
                  </TableCell>

                  {/* CREATED AT */}
                  <TableCell className="px-5 py-4 sm:px-5 text-start text-gray-800 text-theme-sm dark:text-white/90  ">
                    {formatDate(user.created_at)}
                  </TableCell>

                  {/* ACTION */}
                  <TableCell className="px-4 py-3">
                    <div className="flex gap-3">
                      <button
                        onClick={() => onEdit?.(user)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => onDelete?.(user.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Nonaktifkan"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
