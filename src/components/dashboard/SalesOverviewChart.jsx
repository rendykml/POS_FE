import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import api from "../../services/api";
import { MoreVertical } from "lucide-react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

const dummyData = Array.from({ length: 10 }).map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (9 - i));
  return {
    date: date.toISOString().slice(0, 10),
    total: Math.floor(Math.random() * 2000000) + 500000,
  };
});

export default function SalesOverviewChart() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 9);

    const params = {
      start_date: startDate.toISOString().slice(0, 10),
      end_date: endDate.toISOString().slice(0, 10),
    };

    api
      .get("/dashboard/sales-chart", { params })
      .then((res) => {
        setData(res.data?.length ? res.data : dummyData);
      })
      .catch(() => {
        setData(dummyData);
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = data.map((item) =>
    new Date(item.date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
    })
  );

  const series = [
    {
      name: "Penjualan",
      data: data.map((item) => item.total),
    },
  ];

  const options = {
    colors: ["#465fff"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 220,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
        borderRadius: 6,
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        formatter: (val) =>
          new Intl.NumberFormat("id-ID").format(val),
      },
    },
    tooltip: {
      y: {
        formatter: (val) =>
          `Rp ${new Intl.NumberFormat("id-ID").format(val)}`,
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
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Penjualan 10 Hari Terakhir
        </h3>

        <div className="relative">
          <button onClick={() => setIsOpen(!isOpen)}>
            <MoreVertical className="w-5 h-5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>

          <Dropdown
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            className="w-40 p-2"
          >
            <DropdownItem onItemClick={() => setIsOpen(false)}>
              Refresh
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      {/* CHART */}
      <div className="mt-4">
        <Chart options={options} series={series} type="bar" height={220} />
      </div>
    </div>
  );
}
