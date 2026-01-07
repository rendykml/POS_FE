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

const formatDate = (date) =>
  new Date(date).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

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

      {/* BACK BUTTON */}
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
        <p className="text-sm text-gray-500">Memuat data...</p>
      ) : !transaction ? (
        <p className="text-sm text-red-500">
          Data transaksi tidak ditemukan
        </p>
      ) : (
        <>
          {/* ================= TRANSACTION INFO ================= */}
          <ComponentCard>
            <h2 className="mb-4 text-base font-medium text-gray-800 dark:text-white/90">
              Informasi Transaksi
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoRow label="ID Transaksi" value={transaction.id} />
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
                value={`Rp ${Number(
                  transaction.total_amount
                ).toLocaleString("id-ID")}`}
              />
            </div>
          </ComponentCard>

          {/* ================= ITEMS ================= */}
          <ComponentCard className="mt-6 p-0">
            <div className="border-b px-5 py-4">
              <h2 className="text-base font-medium text-gray-800 dark:text-white/90">
                Detail Item
              </h2>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell isHeader>Produk</TableCell>
                    <TableCell isHeader>Harga</TableCell>
                    <TableCell isHeader>Qty</TableCell>
                    <TableCell isHeader>Subtotal</TableCell>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {transaction.items?.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center py-6"
                      >
                        Tidak ada item
                      </TableCell>
                    </TableRow>
                  ) : (
                    transaction.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          {item.product?.name}
                        </TableCell>
                        <TableCell>
                          Rp{" "}
                          {Number(item.price).toLocaleString(
                            "id-ID"
                          )}
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          Rp{" "}
                          {Number(
                            item.price * item.quantity
                          ).toLocaleString("id-ID")}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </ComponentCard>
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
    <div className="flex items-center justify-between rounded-lg border border-gray-100 p-4 dark:border-white/[0.05]">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-800 dark:text-white/90">
        {value || "-"}
      </span>
    </div>
  );
}
