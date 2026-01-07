import { useEffect, useState } from "react";
import api from "../../services/api";

import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const formatCurrency = (value) =>
  `Rp ${Number(value || 0).toLocaleString("id-ID")}`;

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

      // ⬇️ SESUAI CONTROLLER (TANPA data WRAPPER)
      setRows(res.data);
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

      <ComponentCard className="p-0">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-base font-medium text-gray-800 dark:text-white/90">
            Laporan Penjualan per Kasir
          </h2>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Kasir</TableCell>
                <TableCell isHeader>Total Transaksi</TableCell>
                <TableCell isHeader>Total Penjualan</TableCell>
                <TableCell isHeader>Total Profit</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6">
                    Memuat data...
                  </TableCell>
                </TableRow>
              ) : rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6">
                    Tidak ada data laporan kasir
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow key={row.user_id}>
                    {/* KASIR */}
                    <TableCell>
                      {row.cashier?.name || "-"}
                    </TableCell>

                    {/* TOTAL TRANSAKSI */}
                    <TableCell>{row.total_transactions}</TableCell>

                    {/* TOTAL PENJUALAN */}
                    <TableCell>
                      {formatCurrency(row.total_amount)}
                    </TableCell>

                    {/* TOTAL PROFIT */}
                    <TableCell>
                      {formatCurrency(row.total_profit)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </ComponentCard>
    </div>
  );
}
