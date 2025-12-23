import EcommerceMetrics from "../../components/dashboard/Metrics";
import MonthlySalesChart from "../../components/dashboard/MonthlySalesChart";
import RecentOrders from "../../components/dashboard/RecentOrders";
import PageMeta from "../../components/common/PageMeta";

export default function DashboardAdmin() {
  return (
    <>
      <PageMeta
        title="Dashboard Admin"
        description="Dashboard utama sistem POS"
      />

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* METRICS POS */}
        <div className="col-span-12">
          <EcommerceMetrics />
        </div>

        {/* GRAFIK PENJUALAN */}
        <div className="col-span-12 xl:col-span-7">
          <MonthlySalesChart />
        </div>

        {/* TRANSAKSI TERAKHIR */}
        <div className="col-span-12 xl:col-span-5">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}
