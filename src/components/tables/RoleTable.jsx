import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
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

export default function RoleTable({ roles = [], onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
               <TableCell
                isHeader
                className="px-8 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Nama Role
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Created At
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Update At
              </TableCell>
             
              <TableCell
                isHeader
              className="px-7 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Aksi
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {roles.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="px-5 py-6 text-center text-gray-500"
                >
                  Tidak ada data role
                </TableCell>
              </TableRow>
            ) : (
              roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="px-5 py-4 sm:px-5 text-start text-gray-800 text-theme-sm dark:text-white/90 ">
                    {role.name}
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-5 text-start text-gray-800 text-theme-sm dark:text-white/90  ">
                    {formatDate(role.created_at)}
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-5 text-start text-gray-800 text-theme-sm dark:text-white/90 ">
                    {formatDate(role.updated_at)}
                  </TableCell>

                  <TableCell className="px-5 py-4 sm:px-5 text-start text-gray-800 text-theme-sm dark:text-white/90 ">
                    <div className="flex gap-3">
                      <button
                        onClick={() => onEdit(role)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => onDelete(role.id)}
                        className="text-red-600 hover:text-red-800"
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
