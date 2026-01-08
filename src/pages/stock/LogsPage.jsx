import { useEffect, useState } from "react";
import api from "../../services/api";

import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";

import WarehouseLogTable from "../../components/tables/LogTable";

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ======================
     FETCH LOGS
  ====================== */
  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/warehouse/logs");
      setLogs(res.data.data); // pagination
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div>
      <PageMeta title="Logs Gudang | POS" />
      <PageBreadcrumb pageTitle="Logs Gudang" />

      <ComponentCard className="p-0">
        {/* HEADER */}
        <div className="border-b px-5 py-4 border-gray-100 dark:border-gray-500">
          <h2 className="text-base font-medium text-gray-800 dark:text-white/90">
            Riwayat Stok Gudang
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Audit keluar masuk stok
          </p>
        </div>

        {/* TABLE */}
        <div className="p-5">
          <WarehouseLogTable logs={logs} loading={loading} />
        </div>
      </ComponentCard>
    </div>
  );
}
