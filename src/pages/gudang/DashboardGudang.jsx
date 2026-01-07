import { useEffect, useState } from "react";
import api from "../../services/api";

import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Badge from "../../components/ui/badge/Badge";

import { AlertTriangle, Package, TrendingUp } from "lucide-react";

export default function WarehouseDashboardPage() {
  const [lowStock, setLowStock] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ======================
     FETCH DASHBOARD DATA
  ====================== */
  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const [lowStockRes, topProductsRes] = await Promise.all([
        api.get("/dashboard/low-stock"),
        api.get("/dashboard/chart/top-products"),
      ]);

      setLowStock(lowStockRes.data.data ?? lowStockRes.data);
      setTopProducts(topProductsRes.data ?? []);
    } catch (err) {
      console.error("Failed to load warehouse dashboard", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  /* ======================
     RENDER
  ====================== */
  return (
    <div>
      <PageMeta title="Dashboard Gudang | POS" />
      <PageBreadcrumb pageTitle="Dashboard Gudang" />

      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          title="Produk Stok Menipis"
          value={lowStock.length}
          icon={<AlertTriangle size={22} />}
          color="red"
          loading={loading}
        />

        <SummaryCard
          title="Total Produk Dipantau"
          value={topProducts.reduce(
            (sum, p) => sum + Number(p.total_sold || 0),
            0
          )}
          icon={<TrendingUp size={22} />}
          color="purple"
          loading={loading}
        />

        <SummaryCard
          title="Produk Terlaris"
          value={topProducts[0]?.product?.name || "-"}
          icon={<Package size={22} />}
          color="blue"
          loading={loading}
        />
      </div>

      {/* ================= LOW STOCK ================= */}
      <ComponentCard className="mt-6 p-0">
        <div className="border-b px-5 py-4">
          <h2 className="text-base font-medium text-gray-800 dark:text-white/90">
            Stok Menipis
          </h2>
        </div>

        <div className="divide-y">
          {loading ? (
            <p className="p-5 text-sm text-gray-500">Memuat data...</p>
          ) : lowStock.length === 0 ? (
            <p className="p-5 text-sm text-gray-500">Semua stok aman</p>
          ) : (
            lowStock.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between px-5 py-3"
              >
                <div>
                  <p className="font-medium text-gray-800 dark:text-white/90">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Minimum: {item.low_stock_threshold}
                  </p>
                </div>

                <Badge size="sm" color="error">
                  Stok: {item.stock}
                </Badge>
              </div>
            ))
          )}
        </div>
      </ComponentCard>

      {/* ================= TOP PRODUCTS ================= */}
      <ComponentCard className="mt-6 p-0">
        <div className="border-b px-5 py-4">
          <h2 className="text-base font-medium text-gray-800 dark:text-white/90">
            Produk Paling Banyak Keluar
          </h2>
        </div>

        <div className="divide-y">
          {loading ? (
            <p className="p-5 text-sm text-gray-500">Memuat data...</p>
          ) : topProducts.length === 0 ? (
            <p className="p-5 text-sm text-gray-500">
              Belum ada data penjualan
            </p>
          ) : (
            topProducts.map((item, index) => (
              <div
                key={item.product_id}
                className="flex items-center justify-between px-5 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-500/10">
                    #{index + 1}
                  </span>
                  <p className="font-medium text-gray-800 dark:text-white/90">
                    {item.product?.name}
                  </p>
                </div>

                <Badge size="sm" color="info">
                  Terjual: {item.total_sold}
                </Badge>
              </div>
            ))
          )}
        </div>
      </ComponentCard>
    </div>
  );
}

/* ======================
   COMPONENT
====================== */

function SummaryCard({ title, value, icon, color = "blue", loading }) {
  const colorMap = {
    red: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    purple:
      "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
  };

  return (
    <ComponentCard>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="mt-1 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {loading ? "-" : value}
          </h3>
        </div>

        <div className={`rounded-xl p-3 ${colorMap[color]}`}>{icon}</div>
      </div>
    </ComponentCard>
  );
}
