import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Button from "../ui/button";

export default function WarehouseStockTable({
  products = [],
  onStockIn,
  onStockOut,
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell isHeader>SKU</TableCell>
          <TableCell isHeader>Produk</TableCell>
          <TableCell isHeader>Stok</TableCell>
          <TableCell isHeader>Min</TableCell>
          <TableCell isHeader>Max</TableCell>
          <TableCell isHeader>Aksi</TableCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-6">
              Tidak ada data stok
            </TableCell>
          </TableRow>
        ) : (
          products.map((p) => {
            const low = p.stock <= p.low_stock_threshold;

            return (
              <TableRow key={p.id}>
                <TableCell>{p.sku}</TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>
                  <Badge color={low ? "error" : "success"}>
                    {p.stock}
                  </Badge>
                </TableCell>
                <TableCell>{p.low_stock_threshold}</TableCell>
                <TableCell>{p.max_stock}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => onStockIn(p)}
                    >
                      IN
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onStockOut(p)}
                    >
                      OUT
                    </Button>
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
