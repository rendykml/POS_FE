import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";

import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Badge from "../../components/ui/badge/Badge";
import Button from "../../components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

/* ======================
   HELPERS
====================== */

const formatNumber = (value) =>
  Number(value || 0).toLocaleString("id-ID");

/* ======================
   PAGE
====================== */

export default function ReportsStockPage() {
  const [rows, setRows] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category_id: "",
    low_stock_only: false,
  });
  const [loading, setLoading] = useState(true);

  /* ======================
     FETCH DATA
  ====================== */
  const fetchStockReport = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/reports/stock");
      setRows(res.data.data ?? res.data ?? []);
    } catch (err) {
      console.error("Failed to fetch stock report", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.data ?? []);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    fetchStockReport();
    fetchCategories();
  }, []);

  /* ======================
     FILTER LOGIC (CLIENT)
  ====================== */
  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const minStock = Number(
        row.min_stock ?? row.low_stock_threshold ?? 0
      );
      const isLowStock = Number(row.stock) <= minStock;

      if (
        filters.category_id &&
        String(row.category?.id) !== filters.category_id
      ) {
        return false;
      }

      if (filters.low_stock_only && !isLowStock) {
        return false;
      }

      return true;
    });
  }, [rows, filters]);

  /* ======================
     HANDLER
  ====================== */
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetFilter = () => {
    setFilters({
      category_id: "",
      low_stock_only: false,
    });
  };

  /* ======================
     RENDER
  ====================== */
  return (
    <div>
      <PageMeta title="Stock Report | POS" />
      <PageBreadcrumb pageTitle="Stock Report" />

      {/* ================= FILTER ================= */}
      <ComponentCard>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* CATEGORY */}
          <select
            name="category_id"
            value={filters.category_id}
            onChange={handleFilterChange}
            className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 dark:border-white/[0.05] dark:bg-white/[0.03] dark:text-white"
          >
            <option value="">Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* LOW STOCK */}
          <label className="flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-600 dark:border-white/[0.05] dark:bg-white/[0.03] dark:text-gray-400">
            <input
              type="checkbox"
              name="low_stock_only"
              checked={filters.low_stock_only}
              onChange={handleFilterChange}
            />
            Stok menipis saja
          </label>

          {/* ACTION */}
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={resetFilter}>
              Reset
            </Button>
          </div>
        </div>
      </ComponentCard>

      {/* ================= TABLE ================= */}
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-gray-100 p-7 dark:border-white/[0.05]">
          <h2 className="text-base font-medium text-gray-800 dark:text-white/90">
            Laporan Stok Produk
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Total: {filteredRows.length} produk
          </span>
        </div>

        {/* TABLE */}
        <div className="max-w-full overflow-x-auto p-5">
          <Table>
            {/* HEADER */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {[
                  "Produk",
                  "Kategori",
                  "Stok",
                  "Minimum",
                  "Status",
                ].map((h) => (
                  <TableCell
                    key={h}
                    isHeader
                    className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            {/* BODY */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="px-5 py-6 text-center text-gray-500 dark:text-gray-400"
                  >
                    Memuat data...
                  </TableCell>
                </TableRow>
              ) : filteredRows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="px-5 py-6 text-center text-gray-500 dark:text-gray-400"
                  >
                    Tidak ada data sesuai filter
                  </TableCell>
                </TableRow>
              ) : (
                filteredRows.map((row) => {
                  const minStock = Number(
                    row.min_stock ?? row.low_stock_threshold ?? 0
                  );
                  const isLowStock =
                    Number(row.stock) <= minStock;

                  return (
                    <TableRow
                      key={row.id}
                      className="hover:bg-gray-50 dark:hover:bg-white/[0.03]"
                    >
                      <TableCell className="px-5 py-4 text-theme-sm text-gray-800 dark:text-white/90">
                        {row.product_name || row.name}
                      </TableCell>

                      <TableCell className="px-5 py-4 text-theme-sm text-gray-800 dark:text-white/90">
                        {row.category?.name || "-"}
                      </TableCell>

                      <TableCell className="px-5 py-4 text-theme-sm text-gray-800 dark:text-white/90">
                        {formatNumber(row.stock)}
                      </TableCell>

                      <TableCell className="px-5 py-4 text-theme-sm text-gray-800 dark:text-white/90">
                        {formatNumber(minStock)}
                      </TableCell>

                      <TableCell className="px-5 py-4">
                        <Badge
                          size="sm"
                          color={isLowStock ? "error" : "success"}
                        >
                          {isLowStock ? "Stok Menipis" : "Aman"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
