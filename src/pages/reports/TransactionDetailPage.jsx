import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

import { ArrowLeft } from "lucide-react";

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

export default function TransactionDetailPage() {
  const { sale } = useParams();
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ======================
     FETCH DETAIL
  ====================== */
  const fetchDetail = async () => {
    try {
      setLoading(true);
      const res = await api.get(
        `/admin/reports/transactions/${sale}`
      );
      setTransaction(res.data);
    } catch (err) {
      console.error("Failed to load transaction detail", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [sale]);

  /* ======================
     RENDER
  ====================== */
  return (
    <div>
      <PageMeta title="Transaction Detail | POS" />
      <PageBreadcrumb pageTitle="Transaction Detail" />

      {/* ================= BACK ================= */}
      <div className="mb-4">
        <Button
          variant="outline"
          size="sm"
          startIcon={<ArrowLeft size={16} />}
          onClick={() => navigate(-1)}
        >
          Kembali
        </Button>
      </div>

      {loading ? (
        <p className="px-2 text-sm text-gray-500 dark:text-gray-400">
          Memuat data...
        </p>
      ) : !transaction ? (
        <p className="px-2 text-sm text-red-500">
          Data transaksi tidak ditemukan
        </p>
      ) : (
        <>
          {/* ================= INFO ================= */}
          <ComponentCard>
            <h2 className="mb-4 text-base font-medium text-gray-800 dark:text-white/90">
              Informasi Transaksi
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoRow
                label="ID Transaksi"
                value={`#${transaction.id}`}
              />
              <InfoRow
                label="Tanggal"
                value={formatDate(transaction.created_at)}
              />
              <InfoRow
                label="Kasir"
                value={transaction.cashier?.name || "-"}
              />
              <InfoRow
                label="Metode Pembayaran"
                value={transaction.payment_method}
              />
              <InfoRow
                label="Status"
                value={
                  <Badge
                    size="sm"
                    color={
                      transaction.status === "paid"
                        ? "success"
                        : transaction.status === "pending"
                        ? "warning"
                        : "error"
                    }
                  >
                    {transaction.status}
                  </Badge>
                }
              />
              <InfoRow
                label="Total Transaksi"
                value={formatCurrency(transaction.total_amount)}
              />
            </div>
          </ComponentCard>

          {/* ================= ITEMS ================= */}
          <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="border-b border-gray-100 px-5 py-4 dark:border-white/[0.05]">
              <h2 className="text-base font-medium text-gray-800 dark:text-white/90">
                Detail Item
              </h2>
            </div>

            <div className="max-w-full overflow-x-auto">
              <Table>
                {/* HEADER */}
                <TableHeader className="border-b px-7 border-gray-100 dark:border-white/[0.05]">
                  <TableRow>
                    {["Produk", "Harga", "Qty", "Subtotal"].map(
                      (h) => (
                        <TableCell
                          key={h}
                          isHeader
                          className="px-8 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                        >
                          {h}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHeader>

                {/* BODY */}
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {transaction.items?.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="px-5 py-6 text-center text-gray-500 dark:text-gray-400"
                      >
                        Tidak ada item
                      </TableCell>
                    </TableRow>
                  ) : (
                    transaction.items.map((item) => (
                      <TableRow
                        key={item.id}
                        className="hover:bg-gray-50 dark:hover:bg-white/[0.03]"
                      >
                        <TableCell className="px-8 py-4 text-theme-sm text-gray-800 dark:text-white/90">
                          {item.product?.name || "-"}
                        </TableCell>

                        <TableCell className="px-5 py-4 text-theme-sm text-gray-800 dark:text-white/90">
                          {formatCurrency(item.price)}
                        </TableCell>

                        <TableCell className="px-8 py-4 text-theme-sm text-gray-800 dark:text-white/90">
                          {item.quantity}
                        </TableCell>

                        <TableCell className="px-5 py-4 text-theme-sm text-gray-800 dark:text-white/90">
                          {formatCurrency(
                            item.price * item.quantity
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ======================
   COMPONENT
====================== */

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 dark:border-white/[0.05] dark:bg-white/[0.03]">
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {label}
      </span>
      <span className="text-sm font-medium text-gray-800 dark:text-white/90">
        {value || "-"}
      </span>
    </div>
  );
}
