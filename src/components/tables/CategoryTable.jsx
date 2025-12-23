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

export default function CategoryTable({ categories = [], onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* HEADER */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Nama Kategori
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Slug
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Deskripsi
              </TableCell>

              {/* UPDATED AT */}
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Diupdate
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Aksi
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* BODY */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {categories.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="px-5 py-6 text-center text-gray-500 dark:text-gray-400"
                >
                  Tidak ada data kategori
                </TableCell>
              </TableRow>
            ) : (
              categories.map((cat) => (
                <TableRow
                  key={cat.id}
                  className="hover:bg-gray-50 dark:hover:bg-white/[0.03]"
                >
                  <TableCell className=" px-5 py-4 sm:px-6 text-start text-gray-800 dark:text-white/90">
                    {cat.name}
                  </TableCell>

                  <TableCell className=" px-4 py-3 text-gray-500 text-start  dark:text-gray-400">
                    {cat.slug}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start  dark:text-gray-400">
                    {cat.description || "-"}
                  </TableCell>

                  <TableCell className=" px-4 py-3 text-gray-500 text-start  dark:text-gray-400">
                    {formatDate(cat.updated_at)}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500  dark:text-gray-400">
                    <div className="flex gap-3 ">
                      <button
                        onClick={() => onEdit?.(cat)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => onDelete?.(cat.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Hapus"
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
