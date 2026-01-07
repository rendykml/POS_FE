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

const formatDate = (date) =>
  new Date(date).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

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
      setTransactions(res.data.data);
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

  const handleApplyFilter = () => {
    fetchTransactions();
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
            className="h-10 rounded-lg border border-gray-300 px-3 text-sm dark:bg-gray-900"
          />

          <input
            type="date"
            name="end_date"
            value={filters.end_date}
            onChange={handleFilterChange}
            className="h-10 rounded-lg border border-gray-300 px-3 text-sm dark:bg-gray-900"
          />

          <input
            type="text"
            name="cashier_id"
            placeholder="Cashier ID"
            value={filters.cashier_id}
            onChange={handleFilterChange}
            className="h-10 rounded-lg border border-gray-300 px-3 text-sm dark:bg-gray-900"
          />

          <Button variant="primary" onClick={handleApplyFilter}>
            Terapkan Filter
          </Button>
        </div>
      </ComponentCard>

      {/* ================= TABLE ================= */}
      <ComponentCard className="mt-6 p-0">
        <div className="border-b px-5 py-4">
          <h2 className="text-base font-medium text-gray-800 dark:text-white/90">
            Daftar Transaksi
          </h2>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>ID</TableCell>
                <TableCell isHeader>Tanggal</TableCell>
                <TableCell isHeader>Kasir</TableCell>
                <TableCell isHeader>Total</TableCell>
                <TableCell isHeader>Pembayaran</TableCell>
                <TableCell isHeader>Status</TableCell>
                <TableCell isHeader>Aksi</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    Memuat data...
                  </TableCell>
                </TableRow>
              ) : transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    Tidak ada transaksi
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((trx) => (
                  <TableRow key={trx.id}>
                    <TableCell>{trx.id}</TableCell>
                    <TableCell>{formatDate(trx.created_at)}</TableCell>
                    <TableCell>{trx.cashier?.name || "-"}</TableCell>
                    <TableCell>
                      Rp{" "}
                      {Number(trx.total_amount).toLocaleString("id-ID")}
                    </TableCell>
                    <TableCell>{trx.payment_method}</TableCell>
                    <TableCell>
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
                    <TableCell>
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
      </ComponentCard>
    </div>
  );
}
 