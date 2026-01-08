import { useEffect, useState } from "react";
import api from "../../services/api";

import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button";
import Badge from "../../components/ui/badge/Badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import { Eye } from "lucide-react";

/* ======================
   HELPERS
====================== */

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

const formatCurrency = (value) =>
  `Rp ${Number(value || 0).toLocaleString("id-ID")}`;

/* ======================
   PAGE
====================== */

export default function ReportsTransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    start_date: "",
    end_date: "",
    cashier_id: "",
  });
  const [loading, setLoading] = useState(true);

  /* ======================
     FETCH TRANSACTIONS
  ====================== */
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/reports/transactions", {
        params: filters,
      });
      setTransactions(res.data.data ?? []);
    } catch (err) {
      console.error("Failed to fetch transactions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  /* ======================
     HANDLER
  ====================== */
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  /* ======================
     RENDER
  ====================== */
  return (
    <div>
      <PageMeta title="Reports Transactions | POS" />
      <PageBreadcrumb pageTitle="Reports Transactions" />

      {/* ================= FILTER ================= */}
      <ComponentCard>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <input
            type="date"
            name="start_date"
            value={filters.start_date}
            onChange={handleFilterChange}
            className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 dark:border-white/[0.05] dark:bg-white/[0.03] dark:text-white"
          />

          <input
            type="date"
            name="end_date"
            value={filters.end_date}
            onChange={handleFilterChange}
            className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 dark:border-white/[0.05] dark:bg-white/[0.03] dark:text-white"
          />

          <input
            type="text"
            name="cashier_id"
            placeholder="Cashier ID"
            value={filters.cashier_id}
            onChange={handleFilterChange}
            className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 dark:border-white/[0.05] dark:bg-white/[0.03] dark:text-white"
          />

          <Button onClick={fetchTransactions}>
            Terapkan Filter
          </Button>
        </div>
      </ComponentCard>

      {/* ================= TABLE ================= */}
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="border-b border-gray-100 p-7 dark:border-white/[0.05]">
          <h2 className="text-base font-medium text-gray-800 dark:text-white/90">
            Daftar Transaksi
          </h2>
        </div>

        <div className="max-w-full overflow-x-auto p-4">
          <Table>
            {/* ================= HEADER ================= */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {[
                  "ID",
                  "Tanggal",
                  "Kasir",
                  "Total",
                  "Pembayaran",
                  "Status",
                  "Aksi",
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
                    colSpan={7}
                    className="px-5 py-6 text-center text-gray-500 dark:text-gray-400"
                  >
                    Memuat data...
                  </TableCell>
                </TableRow>
              ) : transactions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="px-5 py-6 text-center text-gray-500 dark:text-gray-400"
                  >
                    Tidak ada transaksi
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((trx) => (
                  <TableRow
                    key={trx.id}
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.03]"
                  >
                    <TableCell className="px-5 py-4 text-theme-sm text-gray-800 dark:text-white/90">
                      #{trx.id}
                    </TableCell>

                    <TableCell className="px-5 py-4 text-theme-sm text-gray-800 dark:text-white/90">
                      {formatDate(trx.created_at)}
                    </TableCell>

                    <TableCell className="px-5 py-4 text-theme-sm text-gray-800 dark:text-white/90">
                      {trx.cashier?.name || "-"}
                    </TableCell>

                    <TableCell className="px-5 py-4 text-theme-sm text-gray-800 dark:text-white/90">
                      {formatCurrency(trx.total_amount)}
                    </TableCell>

                    <TableCell className="px-5 py-4 text-theme-sm text-gray-800 dark:text-white/90">
                      {trx.payment_method}
                    </TableCell>

                    <TableCell className="px-5 py-4">
                      <Badge
                        size="sm"
                        color={
                          trx.status === "paid"
                            ? "success"
                            : trx.status === "pending"
                            ? "warning"
                            : "error"
                        }
                      >
                        {trx.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="px-5 py-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          window.location.assign(
                            `/admin/reports/transactions/${trx.id}`
                          )
                        }
                        startIcon={<Eye size={14} />}
                      >
                        Detail
                      </Button>
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
