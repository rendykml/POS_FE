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

const formatNumber = (value) => Number(value || 0).toLocaleString("id-ID");

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
      setRows(res.data.data ?? res.data);
    } catch (err) {
      console.error("Failed to fetch stock report", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");

      console.log("CATEGORY RESPONSE:", res.data);

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
     FILTER LOGIC (CLIENT SIDE)
  ====================== */
  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const minStock = Number(row.min_stock ?? row.low_stock_threshold ?? 0);
      const isLowStock = Number(row.stock) <= minStock;

      // filter kategori
      if (
        filters.category_id &&
        String(row.category?.id) !== filters.category_id
      ) {
        return false;
      }

      // filter stok menipis
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
          {/* KATEGORI */}
          <select
            name="category_id"
            value={filters.category_id}
            onChange={handleFilterChange}
            className="h-10 rounded-lg border border-gray-300 px-3 text-sm dark:bg-gray-900"
          >
            <option value="">Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          

          {/* LOW STOCK */}
          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <input
              type="checkbox"
              name="low_stock_only"
              checked={filters.low_stock_only}
              onChange={handleFilterChange}
            />
            Stok menipis saja
          </label>

          {/* ACTION */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={resetFilter}>
              Reset
            </Button>
          </div>
        </div>
      </ComponentCard>

      {/* ================= TABLE ================= */}
      <ComponentCard className="mt-6 p-0">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-base font-medium text-gray-800 dark:text-white/90">
            Laporan Stok Produk
          </h2>
          <span className="text-sm text-gray-500">
            Total: {filteredRows.length} produk
          </span>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Produk</TableCell>
                <TableCell isHeader>Kategori</TableCell>
                <TableCell isHeader>Stok</TableCell>
                <TableCell isHeader>Minimum</TableCell>
                <TableCell isHeader>Status</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    Memuat data...
                  </TableCell>
                </TableRow>
              ) : filteredRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    Tidak ada data sesuai filter
                  </TableCell>
                </TableRow>
              ) : (
                filteredRows.map((row) => {
                  const minStock = Number(
                    row.min_stock ?? row.low_stock_threshold ?? 0
                  );
                  const isLowStock = Number(row.stock) <= minStock;

                  return (
                    <TableRow key={row.id}>
                      <TableCell>{row.product_name || row.name}</TableCell>

                      <TableCell>{row.category?.name || "-"}</TableCell>

                      <TableCell>{formatNumber(row.stock)}</TableCell>

                      <TableCell>{formatNumber(minStock)}</TableCell>

                      <TableCell>
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
      </ComponentCard>
    </div>
  );
}
