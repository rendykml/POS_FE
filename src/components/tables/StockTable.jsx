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
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* ================= HEADER ================= */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-8 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
              >
                SKU
              </TableCell>

              <TableCell
                isHeader
                className="px-6 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
              >
                Produk
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
              >
                Stok
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
              >
                Min
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
              >
                Max
              </TableCell>

              <TableCell
                isHeader
                className="px-8 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
              >
                Aksi
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* ================= BODY ================= */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {products.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="px-5 py-6 text-center text-gray-500 dark:text-gray-400"
                >
                  Tidak ada data stok
                </TableCell>
              </TableRow>
            ) : (
              products.map((p) => {
                const low = p.stock <= p.low_stock_threshold;

                return (
                  <TableRow
                    key={p.id}
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.03]"
                  >
                    {/* SKU */}
                    <TableCell className="px-5 py-4 text-start text-gray-800 text-theme-sm dark:text-white/90">
                      {p.sku}
                    </TableCell>

                    {/* PRODUK */}
                    <TableCell className="px-5 py-4 text-start text-gray-800 text-theme-sm dark:text-white/90">
                      {p.name}
                    </TableCell>

                    {/* STOK */}
                    <TableCell className="px-5 py-4">
                      <Badge
                        size="sm"
                        color={low ? "error" : "success"}
                      >
                        {p.stock}
                      </Badge>
                    </TableCell>

                    {/* MIN */}
                    <TableCell className="px-5 py-4 text-start text-gray-800 text-theme-sm dark:text-white/90">
                      {p.low_stock_threshold}
                    </TableCell>

                    {/* MAX */}
                    <TableCell className="px-5 py-4 text-start text-gray-800 text-theme-sm dark:text-white/90">
                      {p.max_stock}
                    </TableCell>

                    {/* ACTION */}
                    <TableCell className=" py-4">
                      <div className="flex gap-3">
                        <Button
                          size="sm"
                          onClick={() => onStockIn?.(p)}
                        >
                          IN
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onStockOut?.(p)}
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
      </div>
    </div>
  );
}
