import { useEffect, useState } from "react";
import api from "../../services/api";

import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

import {
  ShoppingCart,
  DollarSign,
  TrendingUp,
} from "lucide-react";

const formatCurrency = (value) =>
  `Rp ${Number(value || 0).toLocaleString("id-ID")}`;

export default function DashboardSummary() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ======================
     FETCH SUMMARY
  ====================== */
  const fetchSummary = async () => {
    try {
      setLoading(true);
      const res = await api.get("/dashboard"); 

      setSummary(res.data?.summary || null);
    } catch (err) {
      console.error("Failed to load dashboard summary", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div>
      <PageMeta title="Dashboard | POS" />
      <PageBreadcrumb pageTitle="Dashboard" />

      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          title="Total Transaksi"
          value={summary?.total_transactions}
          icon={<ShoppingCart size={22} />}
          loading={loading}
          color="blue"
        />

        <SummaryCard
          title="Total Penjualan"
          value={formatCurrency(summary?.total_amount)}
          icon={<DollarSign size={22} />}
          loading={loading}
          color="green"
        />

        <SummaryCard
          title="Rata-rata / Transaksi"
          value={
            summary
              ? formatCurrency(
                  Number(summary.total_amount) /
                    Math.max(summary.total_transactions, 1)
                )
              : "-"
          }
          icon={<TrendingUp size={22} />}
          loading={loading}
          color="purple"
        />
      </div>
    </div>
  );
}

/* ======================
   CARD COMPONENT
====================== */

function SummaryCard({
  title,
  value,
  icon,
  loading,
  color = "blue",
}) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    green:
      "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400",
    purple:
      "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
  };

  return (
    <ComponentCard>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <h3 className="mt-1 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {loading ? "-" : value}
          </h3>
        </div>

        <div
          className={`rounded-xl p-3 ${colorMap[color]}`}
        >
          {icon}
        </div>
      </div>
    </ComponentCard>
  );
}
