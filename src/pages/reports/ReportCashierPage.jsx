import { useEffect, useState } from "react";
import api from "../../services/api";

import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

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

const formatCurrency = (value) =>
  `Rp ${Number(value || 0).toLocaleString("id-ID")}`;

/* ======================
   PAGE
====================== */

export default function ReportsCashierPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ======================
     FETCH CASHIER REPORT
  ====================== */
  const fetchCashierReport = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/reports/cashier");
      setRows(res.data ?? []);
    } catch (err) {
      console.error("Failed to fetch cashier report", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCashierReport();
  }, []);

  /* ======================
     RENDER
  ====================== */
  return (
    <div>
      <PageMeta title="Cashier Report | POS" />
      <PageBreadcrumb pageTitle="Cashier Report" />

      {/* ================= TABLE ================= */}
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        {/* HEADER */}
        <div className="border-b border-gray-100 p-8 dark:border-white/[0.05]">
          <h2 className="text-base font-medium text-gray-800 dark:text-white/90">
            Laporan Penjualan per Kasir
          </h2>
        </div>

        {/* TABLE */}
        <div className="max-w-full overflow-x-auto p-4">
          <Table>
            {/* ================= HEADER ================= */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {[
                  "Kasir",
                  "Total Transaksi",
                  "Total Penjualan",
                  "Total Profit",
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

            {/* ================= BODY ================= */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="px-5 py-6 text-center text-gray-500 dark:text-gray-400"
                  >
                    Memuat data...
                  </TableCell>
                </TableRow>
              ) : rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="px-5 py-6 text-center text-gray-500 dark:text-gray-400"
                  >
                    Tidak ada data laporan kasir
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow
                    key={row.user_id}
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.03]"
                  >
                    {/* KASIR */}
                    <TableCell className="px-5 py-4 text-theme-sm text-gray-800 dark:text-white/90">
                      {row.cashier?.name || "-"}
                    </TableCell>

                    {/* TOTAL TRANSAKSI */}
                    <TableCell className="px-5 py-4 text-theme-sm text-gray-800 dark:text-white/90">
                      {row.total_transactions}
                    </TableCell>

                    {/* TOTAL PENJUALAN */}
                    <TableCell className="px-5 py-4 text-theme-sm text-gray-800 dark:text-white/90">
                      {formatCurrency(row.total_amount)}
                    </TableCell>

                    {/* TOTAL PROFIT */}
                    <TableCell className="px-5 py-4 text-theme-sm text-gray-800 dark:text-white/90">
                      {formatCurrency(row.total_profit)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
