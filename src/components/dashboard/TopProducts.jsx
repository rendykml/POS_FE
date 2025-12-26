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
      .get("/dashboard/top-products")
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
          <TableHeader className="border-y border-gray-100 dark:border-gray-800">
            <TableRow>
              <TableCell isHeader className="py-3 text-xs font-medium text-gray-500">
                Produk
              </TableCell>
              <TableCell isHeader className="py-3 text-xs font-medium text-gray-500">
                Terjual
              </TableCell>
              <TableCell isHeader className="py-3 text-xs font-medium text-gray-500">
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
              <TableRow key={item.product_id}>
                {/* PRODUCT */}
                <TableCell className="py-3">
                  <p className="font-medium text-gray-800 dark:text-white/90">
                    {item.product?.name || "-"}
                  </p>
                </TableCell>

                {/* TOTAL SOLD */}
                <TableCell className="py-3 text-sm text-gray-500 dark:text-gray-400">
                  {item.total_sold} item
                </TableCell>

                {/* STATUS */}
                <TableCell className="py-3">
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
