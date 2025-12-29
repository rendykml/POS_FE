import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import api from "../../services/api";

const formatRupiah = (val = 0) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);

export default function ProfitChart() {
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/dashboard/chart/profit")
      .then((res) => {
        if (!res.data || res.data.length === 0) {
          // dummy jika kosong
          const dummyDays = [...Array(10)].map((_, i) => `Hari ${i + 1}`);
          const dummyProfit = [...Array(10)].map(() =>
            Math.floor(Math.random() * 500000)
          );

          setCategories(dummyDays);
          setSeries([{ name: "Profit", data: dummyProfit }]);
          return;
        }

        setCategories(res.data.map((i) => i.date));
        setSeries([
          {
            name: "Profit",
            data: res.data.map((i) => i.profit),
          },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const options = {
    chart: {
      type: "area",
      height: 260,
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
    },
    colors: ["#22c55e"],
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.05,
      },
    },
    xaxis: {
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        formatter: (val) => formatRupiah(val),
      },
    },
    tooltip: {
      y: {
        formatter: (val) => formatRupiah(val),
      },
    },
    grid: {
      yaxis: { lines: { show: true } },
    },
  };

  if (loading) {
    return (
      <div className="h-[280px] animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800" />
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
        Profit 10 Hari Terakhir
      </h3>

      <Chart options={options} series={series} type="area" height={260} />
    </div>
  );
}
