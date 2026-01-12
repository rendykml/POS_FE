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

import { Eye, Filter } from "lucide-react";

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
  const defaultFilters = {
    start_date: "",
    end_date: "",
    cashier_id: "",
  };
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({
    total: 0,
    current_page: 1,
    last_page: 1,
    per_page: 10,
  });

  const [summary, setSummary] = useState({
    total_transactions: 0,
    total_revenue: 0,
  });

  /* ======================
     FETCH TRANSACTIONS
  ====================== */
  const fetchTransactions = async (page = 1, perPage = meta.per_page) => {
    try {
      setLoading(true);

      const res = await api.get("/admin/reports/transactions", {
        params: {
          ...filters,
          page,
          per_page: perPage,
        },
      });
      console.log(res.headers);
      console.log(res.data);

      // TABLE DATA
      setTransactions(res.data.data);

      // PAGINATION META
      setMeta((prev) => ({
        ...prev,
        ...res.data.meta,
      }));

      // SUMMARY (DARI BACKEND, BUKAN HITUNG SENDIRI)
      setSummary(res.data.summary);
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
     EXPORT HANDLER
  ====================== */

  const handleExportCsv = async () => {
    try {
      setLoading(true);

      const res = await api.get("/admin/reports/transactions/export/csv", {
        params: filters,
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: "text/csv;charset=utf-8;" })
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "transactions-report.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPdf = async () => {
    try {
      setLoading(true);

      const res = await api.get("/admin/reports/transactions/export/pdf", {
        params: filters,
        responseType: "blob", // ⬅️ WAJIB
      });

      const blob = new Blob([res.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "transactions-report.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Gagal export PDF", err);
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     HANDLER
  ====================== */
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  const handleApplyFilter = () => {
    fetchTransactions(1);
  };
  const handleReset = () => {
    setFilters(defaultFilters);

    // reset ke page 1 + per_page tetap
    fetchTransactions(1, meta.per_page);
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
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

          <Button
            startIcon={<Filter size={14} />}
            size="sm"
            onClick={handleApplyFilter}
          ></Button>
          <Button size="sm" variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </ComponentCard>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* TOTAL TRANSAKSI */}
        <ComponentCard>
          <p className="text-sm text-gray-500">Total Transaksi</p>
          <h3 className="mt-1 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {summary.total_transactions}
          </h3>
        </ComponentCard>

        {/* TOTAL REVENUE */}
        <ComponentCard>
          <p className="text-sm text-gray-500">Total Revenue</p>
          <h3 className="mt-1 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Rp {Number(summary.total_revenue).toLocaleString("id-ID")}
          </h3>
        </ComponentCard>
      </div>

      {/* ================= TABLE ================= */}
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="border-b border-gray-100 p-7 dark:border-white/[0.05] flex items-center justify-between">
          <h2 className="text-base font-medium text-gray-800 dark:text-white/90">
            Daftar Transaksi{" "}
            <p className="text-sm text-gray-500">
              Periode:{" "}
              {filters.start_date && filters.end_date
                ? `${filters.start_date} s/d ${filters.end_date}`
                : "Semua tanggal"}
            </p>
          </h2>
          <div className="flex gap-4 text-sm text-gray-600">
            <span className="text-gray-500 text-sm">
              Menampilkan {(meta.current_page - 1) * 10 + 1} –{" "}
              {Math.min(meta.current_page * 10, meta.total)} dari {meta.total}{" "}
              transaksi
            </span>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleExportCsv}
              disabled={loading || transactions.length === 0}
            >
              Export CSV
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={handleExportPdf}
              disabled={loading}
            >
              Export PDF
            </Button>
          </div>
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
          <div className="flex items-center justify-between px-4 py-3 text-sm">
            <span className="text-gray-500">
              Halaman {meta.current_page} dari {meta.last_page}
            </span>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={meta.current_page === 1}
                onClick={() => fetchTransactions(meta.current_page - 1)}
              >
                Sebelumnya
              </Button>

              <Button
                size="sm"
                variant="outline"
                disabled={meta.current_page === meta.last_page}
                onClick={() => fetchTransactions(meta.current_page + 1)}
              >
                Selanjutnya
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
