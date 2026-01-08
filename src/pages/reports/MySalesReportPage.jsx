import { useEffect, useState } from "react";
import api from "../../services/api";

import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button";

/* ======================
   HELPERS
====================== */

const formatCurrency = (value) =>
  `Rp ${Number(value || 0).toLocaleString("id-ID")}`;

/* ======================
   PAGE
====================== */

export default function MySalesSummaryPage() {
  const [summary, setSummary] = useState(null);
  const [filters, setFilters] = useState({
    start_date: "",
    end_date: "",
  });
  const [loading, setLoading] = useState(true);

  /* ======================
     FETCH SUMMARY
  ====================== */
  const fetchSummary = async () => {
    try {
      setLoading(true);

      const res = await api.get("/cashier/sales/summary", {
        params:
          filters.start_date && filters.end_date ? filters : {},
      });

      setSummary(res.data);
    } catch (err) {
      console.error("Failed to fetch my sales summary", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  /* ======================
     HANDLER
  ====================== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  /* ======================
     RENDER
  ====================== */
  return (
    <div>
      <PageMeta title="My Sales | POS" />
      <PageBreadcrumb pageTitle="My Sales" />

      {/* ================= FILTER ================= */}
      <ComponentCard>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <input
            type="date"
            name="start_date"
            value={filters.start_date}
            onChange={handleChange}
            className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 dark:border-white/[0.05] dark:bg-white/[0.03] dark:text-white"
          />

          <input
            type="date"
            name="end_date"
            value={filters.end_date}
            onChange={handleChange}
            className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 dark:border-white/[0.05] dark:bg-white/[0.03] dark:text-white"
          />

          <Button onClick={fetchSummary}>
            Terapkan
          </Button>
        </div>
      </ComponentCard>

      {/* ================= SUMMARY ================= */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Kasir"
          value={summary?.cashier}
          loading={loading}
        />

        <SummaryCard
          title="Total Transaksi"
          value={summary?.total_transactions}
          loading={loading}
        />

        <SummaryCard
          title="Total Penjualan"
          value={formatCurrency(summary?.total_amount)}
          loading={loading}
        />

        <SummaryCard
          title="Total Profit"
          value={formatCurrency(summary?.total_profit)}
          loading={loading}
        />
      </div>

      {/* ================= DETAIL ================= */}
      <ComponentCard className="mt-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DetailRow
            label="Total Modal"
            value={formatCurrency(summary?.total_cost)}
          />
        </div>
      </ComponentCard>
    </div>
  );
}

/* ======================
   COMPONENTS
====================== */

function SummaryCard({ title, value, loading }) {
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
      </div>
    </ComponentCard>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 dark:border-white/[0.05] dark:bg-white/[0.03]">
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {label}
      </span>
      <span className="text-sm font-medium text-gray-800 dark:text-white/90">
        {value}
      </span>
    </div>
  );
}
