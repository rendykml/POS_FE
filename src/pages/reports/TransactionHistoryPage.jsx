import { useState } from "react";
import { History, Search, Eye } from "lucide-react";

export default function TransactionHistoryPage() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selected, setSelected] = useState(null);

  // Dummy transaction data
  const transactions = [
    {
      id: 1,
      invoice: "INV-001",
      date: "2025-01-05",
      cashier: "Kasir 1",
      total: 150000,
      items: [
        { name: "Kemeja Polos", qty: 1, price: 120000 },
        { name: "Kaos", qty: 1, price: 30000 },
      ],
    },
    {
      id: 2,
      invoice: "INV-002",
      date: "2025-01-05",
      cashier: "Kasir 2",
      total: 200000,
      items: [
        { name: "Celana Jeans", qty: 1, price: 200000 },
      ],
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Riwayat Transaksi</h1>

      {/* FILTER */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex gap-4 items-end">
        <div>
          <label className="block font-semibold mb-1">Dari</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Sampai</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Search size={18} /> Filter
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-xl shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-2">Invoice</th>
              <th className="p-2">Tanggal</th>
              <th className="p-2">Kasir</th>
              <th className="p-2">Total</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-b hover:bg-gray-50">
                <td className="p-2 font-semibold">{t.invoice}</td>
                <td className="p-2">{t.date}</td>
                <td className="p-2">{t.cashier}</td>
                <td className="p-2 font-bold">Rp {t.total.toLocaleString()}</td>
                <td className="p-2">
                  <button
                    onClick={() => setSelected(t)}
                    className="text-cyan-600 hover:text-cyan-800 flex items-center gap-1"
                  >
                    <Eye size={18} /> Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL DETAIL TRANSAKSI */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow relative">
            
            <button
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">Detail Transaksi</h2>

            <p><b>Invoice:</b> {selected.invoice}</p>
            <p><b>Tanggal:</b> {selected.date}</p>
            <p><b>Kasir:</b> {selected.cashier}</p>

            <div className="mt-4">
              <h3 className="font-bold mb-2">Produk:</h3>
              <table className="w-full border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2">Nama</th>
                    <th className="p-2">Qty</th>
                    <th className="p-2">Harga</th>
                  </tr>
                </thead>
                <tbody>
                  {selected.items.map((i, idx) => (
                    <tr key={idx}>
                      <td className="p-2">{i.name}</td>
                      <td className="p-2">{i.qty}</td>
                      <td className="p-2">Rp {i.price.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-right mt-4 text-xl font-bold">
              Total: Rp {selected.total.toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
