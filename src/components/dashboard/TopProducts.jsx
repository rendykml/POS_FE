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

export default function TopProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/dashboard/chart/top-products")
      .then((res) => {
        setProducts(res.data || []);
      })
      .catch(() => {
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Top Products
        </h3>
      </div>

      {/* TABLE */}
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Produk
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Terjual
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {loading && (
              <TableRow>
                <TableCell colSpan={3} className="py-6 text-center text-sm text-gray-500">
                  Memuat data...
                </TableCell>
              </TableRow>
            )}

            {!loading && products.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="py-6 text-center text-sm text-gray-500">
                  Belum ada data penjualan
                </TableCell>
              </TableRow>
            )}

            {products.map((item) => (
              <TableRow key={item.product_id} className="hover:bg-gray-50 dark:hover:bg-white/[0.03]">
                {/* PRODUCT */}
                <TableCell className=" px-3 py-4.5 sm:px-2 text-gray-800 dark:text-white/90">
                  <p className="font-medium text-gray-800 dark:text-white/90">
                    {item.product?.name || "-"}
                  </p>
                </TableCell>

                {/* TOTAL SOLD */}
                <TableCell  className=" px-4 py-3 text-gray-500 text-start  dark:text-gray-400">
                  {item.total_sold} item
                </TableCell>

                {/* STATUS */}
                <TableCell  className="px-3 py-3 text-gray-500  dark:text-gray-400">
                  <Badge size="sm" color="success">
                    Terlaris
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
