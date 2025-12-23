import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";
import { Pencil, Trash2 } from "lucide-react";

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
                className="px-2 py-3 text-theme-xs font-medium text-gray-500"
              >
                Nama Kategori
              </TableCell>
              <TableCell
                isHeader
                className="px-2 py-3 text-theme-xs font-medium text-gray-500"
              >
                Slug
              </TableCell>
              <TableCell
                isHeader
                className="px-2 py-3 text-theme-xs font-medium text-gray-500"
              >
                Deskripsi
              </TableCell>

              <TableCell
                isHeader
                className="px-2 py-3 text-center text-theme-xs font-medium text-gray-500"
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
                  className="px-5 py-6 text-center text-gray-500"
                >
                  Tidak ada data kategori
                </TableCell>
              </TableRow>
            ) : (
              categories.map((cat) => (
                <TableRow key={cat.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.03]">
                  <TableCell className="pl-8  py-3 font-medium text-gray-800 dark:text-white/90">
                    {cat.name}
                  </TableCell>

                  <TableCell className="pl-8  py-3 text-gray-500">
                    {cat.slug}
                  </TableCell>

                  <TableCell className="pl-8  py-3 text-gray-500">
                    {cat.description || "-"}
                  </TableCell>

                  <TableCell className="px-8  py-3">
                    <div className="flex gap-3  justify-center">
                      <button
                        onClick={() => onEdit?.(cat)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => onDelete?.(cat.id)}
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
