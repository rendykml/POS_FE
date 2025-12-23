import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Pencil, Trash2, AlertTriangle } from "lucide-react";

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

export default function ProductTable({ products = [], onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* HEADER */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-2 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400 text-center "
              >
                Nama Produk
              </TableCell>

              <TableCell
                isHeader
                className="px-2 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400 text-center"
              >
                SKU
              </TableCell>

              <TableCell
                isHeader
                className="px-2 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400 text-center"
              >
                Kategori
              </TableCell>

              <TableCell
                isHeader
                className="px-2 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400 text-center"
              >
                Harga
              </TableCell>

              <TableCell
                isHeader
                className="px-2 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400 text-center"
              >
                Stok
              </TableCell>

              <TableCell
                isHeader
                className="px-2 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400 text-center"
              >
                Status
              </TableCell>

              {/* UPDATED AT */}
              <TableCell
                isHeader
                className="px-2 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400 text-center"
              >
                Diupdate
              </TableCell>

              <TableCell
                isHeader
                className="px-2 py-3 text-center text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Aksi
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* BODY */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {products.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="px-5 py-6 text-center text-gray-500 dark:text-gray-400"
                >
                  Tidak ada data produk
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => {
                const isLowStock =
                  product.stock <= product.low_stock_threshold;

                return (
                  <TableRow
                    key={product.id}
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.03]"
                  >
                    <TableCell className="py-3 text-center font-medium text-gray-800 dark:text-white/90">
                      {product.name}
                    </TableCell>

                    <TableCell className="py-3 text-center text-gray-500 dark:text-gray-400">
                      {product.sku}
                    </TableCell>

                    <TableCell className="py-3 text-center text-gray-500 dark:text-gray-400">
                      {product.category?.name || "-"}
                    </TableCell>

                    <TableCell className="py-3 text-center text-gray-500 dark:text-gray-400">
                      Rp{" "}
                      {Number(product.price).toLocaleString("id-ID")}
                    </TableCell>

                    <TableCell className="py-3 text-center text-gray-500 dark:text-gray-400">
                      {product.stock}
                    </TableCell>

                    {/* STATUS */}
                    <TableCell className="py-3 text-center">
                      {isLowStock ? (
                        <span className="inline-flex items-center gap-1 text-red-600 text-sm">
                          <AlertTriangle size={14} />
                          Low
                        </span>
                      ) : (
                        <span className="text-green-600 text-sm">
                          Aman
                        </span>
                      )}
                    </TableCell>

                    {/* UPDATED AT */}
                    <TableCell className="py-3 text-center text-gray-500 dark:text-gray-400 text-sm">
                      {formatDate(product.updated_at)}
                    </TableCell>

                    {/* ACTION */}
                    <TableCell className="px-8 py-3">
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => onEdit?.(product)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => onDelete?.(product.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
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
