import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";

import { Eye, CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function ReturnTable({
  returns,
  onApprove,
  onReject,
  onDetail,
  role,
  loadingId,
}) {
  return (
    <Table>
      {/* ================= HEADER ================= */}
      <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
        <TableRow>
          <TableCell
            isHeader
            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
          >
            ID
          </TableCell>

          <TableCell
            isHeader
            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
          >
            Sale ID
          </TableCell>

          <TableCell
            isHeader
            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
          >
            Total Refund
          </TableCell>

          <TableCell
            isHeader
            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
          >
            Status
          </TableCell>

          {role === "admin" && (
            <TableCell
              isHeader
              className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
            >
              Aksi
            </TableCell>
          )}
        </TableRow>
      </TableHeader>

      {/* ================= BODY ================= */}
      <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
        {returns.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={role === "admin" ? 5 : 4}
              className="px-5 py-6 text-center text-gray-500 dark:text-gray-400"
            >
              Tidak ada data return
            </TableCell>
          </TableRow>
        ) : (
          returns.map((item) => {
            const isLoading = loadingId === item.id;

            return (
              <TableRow
                key={item.id}
                className="hover:bg-gray-50 dark:hover:bg-white/[0.03]"
              >
                {/* ID */}
                <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90">
                  {item.id}
                </TableCell>

                {/* SALE ID */}
                <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90">
                  {item.sale_id}
                </TableCell>

                {/* TOTAL REFUND */}
                <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90">
                  Rp {item.total_refund}
                </TableCell>

                {/* STATUS */}
                <TableCell className="px-4 py-3">
                  <Badge
                    size="sm"
                    color={
                      item.status === "approved"
                        ? "success"
                        : item.status === "rejected"
                          ? "error"
                          : "warning"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>

                {/* ACTION */}
                <TableCell className="px-4 py-3">
                  <div className="flex gap-3 items-center">
                    {/* DETAIL - Semua role */}
                    <button
                      onClick={() => onDetail?.(item.id)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Detail"
                    >
                      <Eye size={16} />
                    </button>

                    {/* Approve / Reject hanya admin & pending */}
                    {role === "admin" && item.status === "pending" && (
                      <>
                        <button
                          onClick={() => onApprove(item.id)}
                          disabled={isLoading}
                          className="text-green-600 hover:text-green-800 disabled:opacity-50"
                          title="Approve"
                        >
                          {isLoading ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <CheckCircle size={16} />
                          )}
                        </button>

                        <button
                          onClick={() => onReject(item.id)}
                          disabled={isLoading}
                          className="text-red-600 hover:text-red-800 disabled:opacity-50"
                          title="Reject"
                        >
                          <XCircle size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
