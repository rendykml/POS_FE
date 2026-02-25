import { useEffect, useState } from "react";
import api from "../../services/api";
import Button from "../ui/button";

export default function ReturnFormModal({
  isOpen,
  onClose,
  onSubmit,
  loading,
}) {
  const [sales, setSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [items, setItems] = useState([]);
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchSales();
    }
  }, [isOpen]);

  const fetchSales = async () => {
    try {
      const res = await api.get("/cashier/sales");
      setSales(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectSale = async (saleId) => {
    try {
      const res = await api.get(`/cashier/sales/${saleId}`);
      const sale = res.data.data;

      setSelectedSale(sale);

      const formattedItems = sale.items.map((item) => ({
        sale_item_id: item.id,
        product_name: item.product.name,
        max_qty: item.quantity,
        quantity: 0,
        checked: false,
      }));

      setItems(formattedItems);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedItems = items
      .filter((item) => item.checked && item.quantity > 0)
      .map((item) => ({
        sale_item_id: item.sale_item_id,
        quantity: item.quantity,
      }));

    if (!selectedSale || selectedItems.length === 0) {
      alert("Pilih item yang akan direturn");
      return;
    }

    onSubmit({
      sale_id: selectedSale.id,
      reason,
      items: selectedItems,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 w-[750px] rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Ajukan Return</h3>

        {/* SELECT SALE */}
        <select
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) => handleSelectSale(e.target.value)}
        >
          <option value="">Pilih Invoice</option>
          {sales.map((sale) => (
            <option key={sale.id} value={sale.id}>
              {sale.invoice_number}
            </option>
          ))}
        </select>

        {/* ITEMS TABLE */}
        {selectedSale && (
          <div className="max-h-64 overflow-y-auto mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th>Pilih</th>
                  <th>Produk</th>
                  <th>Qty Beli</th>
                  <th>Qty Return</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td>
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          const newItems = [...items];
                          newItems[index].checked = e.target.checked;
                          setItems(newItems);
                        }}
                      />
                    </td>

                    <td>{item.product_name}</td>
                    <td>{item.max_qty}</td>

                    <td>
                      <input
                        type="number"
                        min="0"
                        max={item.max_qty}
                        className="border p-1 w-20 rounded"
                        disabled={!item.checked}
                        onChange={(e) => {
                          const newItems = [...items];
                          newItems[index].quantity = Number(e.target.value);
                          setItems(newItems);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* REASON */}
        <textarea
          placeholder="Alasan return"
          className="w-full border p-2 rounded mb-4"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        {/* BUTTON */}
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>

          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Menyimpan..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
}
