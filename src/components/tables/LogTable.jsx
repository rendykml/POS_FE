import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

const formatDate = (date) =>
  new Date(date).toLocaleString("id-ID");

export default function WarehouseLogTable({ logs = [], loading }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell isHeader>Tanggal</TableCell>
          <TableCell isHeader>Produk</TableCell>
          <TableCell isHeader>User</TableCell>
          <TableCell isHeader>Jenis</TableCell>
          <TableCell isHeader>Perubahan</TableCell>
          <TableCell isHeader>Catatan</TableCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-6">
              Memuat logs...
            </TableCell>
          </TableRow>
        ) : logs.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-6">
              Belum ada riwayat stok
            </TableCell>
          </TableRow>
        ) : (
          logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{formatDate(log.created_at)}</TableCell>
              <TableCell>{log.product?.name}</TableCell>
              <TableCell>{log.user?.name}</TableCell>
              <TableCell>
                <Badge color={log.type === "IN" ? "success" : "error"}>
                  {log.type}
                </Badge>
              </TableCell>
              <TableCell>{log.change}</TableCell>
              <TableCell>{log.note}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
