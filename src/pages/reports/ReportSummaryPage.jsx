import { useEffect, useState } from "react";
import api from "../../services/api";

import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Badge from "../../components/ui/badge/Badge";

import {
  TrendingUp,
  ShoppingCart,
  DollarSign,
  Receipt,
} from "lucide-react";

export default function ReportSummaryPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ======================
     FETCH SUMMARY
  ====================== */
  const fetchSummary = async () => {
    try {
      setLoading(true);
      const res = await api.get("admin/reports/summary");
      setSummary(res.data);
    } catch (err) {
      console.error("Failed to load report summary", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  /* ======================
     RENDER
  ====================== */
  return (
    <div>
      <PageMeta title="Report Summary | POS" />
      <PageBreadcrumb pageTitle="Report Summary" />

      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Transaksi"
          value={summary?.total_transactions}
          icon={<Receipt />}
          loading={loading}
        />

        <SummaryCard
          title="Total Penjualan"
          value={`Rp ${Number(
            summary?.total_sales || 0
          ).toLocaleString("id-ID")}`}
          icon={<DollarSign />}
          loading={loading}
        />

        <SummaryCard
          title="Total Profit"
          value={`Rp ${Number(
            summary?.total_profit || 0
          ).toLocaleString("id-ID")}`}
          icon={<TrendingUp />}
          loading={loading}
        />

        <SummaryCard
          title="Produk Terjual"
          value={summary?.total_items_sold}
          icon={<ShoppingCart />}
          loading={loading}
        />
      </div>

      {/* ================= DETAIL ================= */}
      <ComponentCard className="mt-6">
        <h3 className="mb-4 text-base font-medium text-gray-800 dark:text-white/90">
          Ringkasan Hari Ini
        </h3>

        {loading ? (
          <p className="text-sm text-gray-500">Memuat data...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoRow label="Tanggal" value={summary?.date} />
            <InfoRow
              label="Kasir Aktif"
              value={summary?.active_cashiers}
            />
            <InfoRow
              label="Metode Pembayaran Terbanyak"
              value={summary?.top_payment_method}
            />
            <InfoRow
              label="Produk Terlaris"
              value={summary?.top_product}
            />
          </div>
        )}
      </ComponentCard>
    </div>
  );
}

/* ======================
   COMPONENTS
====================== */

function SummaryCard({ title, value, icon, loading }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="mt-1 text-xl font-semibold text-gray-800 dark:text-white/90">
            {loading ? "-" : value}
          </h3>
        </div>
        <div className="rounded-lg bg-brand-50 p-3 text-brand-600 dark:bg-brand-500/10">
          {icon}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-100 p-4 dark:border-white/[0.05]">
      <span className="text-sm text-gray-500">{label}</span>
      <Badge size="sm" color="info">
        {value || "-"}
      </Badge>
    </div>
  );
}
