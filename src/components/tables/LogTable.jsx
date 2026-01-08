import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function WarehouseLogTable({ logs = [], loading }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* ================= HEADER ================= */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
              >
                Tanggal
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
              >
                Produk
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
              >
                User
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
              >
                Jenis
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
              >
                Perubahan
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
              >
                Catatan
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* ================= BODY ================= */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="px-5 py-6 text-center text-gray-500 dark:text-gray-400"
                >
                  Memuat logs...
                </TableCell>
              </TableRow>
            ) : logs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="px-5 py-6 text-center text-gray-500 dark:text-gray-400"
                >
                  Belum ada riwayat stok
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log) => (
                <TableRow
                  key={log.id}
                  className="hover:bg-gray-50 dark:hover:bg-white/[0.03]"
                >
                  {/* TANGGAL */}
                  <TableCell className="px-5 py-4 text-start text-gray-800 text-theme-sm dark:text-white/90">
                    {formatDate(log.created_at)}
                  </TableCell>

                  {/* PRODUK */}
                  <TableCell className="px-5 py-4 text-start text-gray-800 text-theme-sm dark:text-white/90">
                    {log.product?.name || "-"}
                  </TableCell>

                  {/* USER */}
                  <TableCell className="px-5 py-4 text-start text-gray-800 text-theme-sm dark:text-white/90">
                    {log.user?.name || "-"}
                  </TableCell>

                  {/* JENIS */}
                  <TableCell className="px-5 py-4">
                    <Badge
                      size="sm"
                      color={log.type === "IN" ? "success" : "error"}
                    >
                      {log.type}
                    </Badge>
                  </TableCell>

                  {/* PERUBAHAN */}
                  <TableCell className="px-5 py-4 text-start text-gray-800 text-theme-sm dark:text-white/90">
                    {log.change}
                  </TableCell>

                  {/* CATATAN */}
                  <TableCell className="px-5 py-4 text-start text-gray-800 text-theme-sm dark:text-white/90">
                    {log.note || "-"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
