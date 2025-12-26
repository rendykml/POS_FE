import Metrics from "../../components/dashboard/Metrics";
import SalesOverviewChart from "../../components/dashboard/SalesOverviewChart";
import TopProducts from "../../components/dashboard/TopProducts";
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
          <Metrics />
        </div>

        {/* GRAFIK PENJUALAN */}
        <div className="col-span-12 xl:col-span-7">
          <SalesOverviewChart />
        </div>

       {/* CHARTS */}
        {/* <div className="col-span-12 xl:col-span-6">
          <SalesChart />
        </div> */}

        {/* <div className="col-span-12 xl:col-span-6">
          <ProfitChart />
        </div> */}

        {/* TABLES */}
        <div className="col-span-12 xl:col-span-5">
          <TopProducts />
        </div>

        {/* <div className="col-span-12 xl:col-span-6">
          <LowStockProducts />
        </div> */}

      </div>
    </>
  );
}
