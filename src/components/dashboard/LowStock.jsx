import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

export default function LowStockTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/dashboard/low-stock")
      .then((res) => {
        setProducts(res.data.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Low Stock Products
        </h3>

        <Badge color="error" size="sm">
          Alert
        </Badge>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="h-32 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
      ) : products.length === 0 ? (
        <div className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
          🎉 Semua stok aman
        </div>
      ) : (
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Produk
                </TableCell>
                <TableCell isHeader className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Stok
                </TableCell>
                <TableCell isHeader className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-4000">
                  Batas
                </TableCell>
                <TableCell isHeader className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Status
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {products.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.03]">
                  <TableCell className="px-3 py-4.5 sm:px-2 text-gray-800 dark:text-white/90">
                    {item.name}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start  dark:text-gray-400">
                    {item.stock}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start  dark:text-gray-400">
                    {item.low_stock_threshold}
                  </TableCell>

                  <TableCell className=" py-3 text-gray-500 text-start  dark:text-gray-400">
                    <Badge color="error" size="sm">
                      Low Stock
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
