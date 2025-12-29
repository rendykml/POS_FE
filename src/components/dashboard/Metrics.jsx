import { useEffect, useState } from "react";
import { ShoppingCart, DollarSign, TrendingUp, Wallet } from "lucide-react";

import api from "../../services/api";
import Badge from "../ui/badge/Badge";

const formatCurrency = (value = 0) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export default function Metrics() {
  const [data, setData] = useState({
    total_transactions: 0,
    total_amount: 0,
    total_cost: 0,
    total_profit: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/dashboard")
      .then((res) => {
  setData(res.data?.summary || {});
      })

      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6 ">
      {/* TOTAL TRANSAKSI */}
      <MetricCard
        title="Total Transaksi"
        value={data.total_transactions}
        icon={<ShoppingCart className="text-gray-700 dark:text-white"/>}
        color="primary"
        
      />

      {/* TOTAL PENJUALAN */}
      <MetricCard
        title="Total Penjualan"
        value={formatCurrency(data.total_amount)}
        icon={<DollarSign className="text-gray-700 dark:text-white"/>}
        color="success"
      />

      {/* TOTAL MODAL */}
      <MetricCard
        title="Total Modal"
        value={formatCurrency(data.total_cost)}
        icon={<Wallet className="text-gray-700 dark:text-white"/>}
        color="warning"
      />

      {/* TOTAL PROFIT */}
      <MetricCard
        title="Total Profit"
        value={formatCurrency(data.total_profit)}
        icon={<TrendingUp className="text-gray-700 dark:text-white"/>}
        color="success"
      />
    </div>
  );
}

/* ======================
   REUSABLE CARD
====================== */
function MetricCard({ title, value, icon, color }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
        {icon}
      </div>

      <div className="mt-5">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {title}
        </span>
        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
          {value}
        </h4>
      </div>

      <div className="mt-3">
        <Badge color={color} size="sm">
          Hari ini
        </Badge>
      </div>
    </div>
  );
}
