
import { AlertTriangle, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function LowStockPage() {

  const productsDummy = [
    { id: 1, name: "Kemeja Polos", stock: 3, min: 5 },
    { id: 2, name: "Celana Jeans", stock: 1, min: 5 },
    { id: 3, name: "Jaket Hoodie", stock: 12, min: 5 }, // tidak masuk alert
    { id: 4, name: "Kaos Oversize", stock: 4, min: 5 },
  ];

  const lowStock = productsDummy.filter((p) => p.stock < p.min);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Notifikasi Stok Menipis</h1>

      {lowStock.length === 0 ? (
        <div className="bg-green-100 text-green-700 p-4 rounded-lg">
          Semua stok aman.
        </div>
      ) : (
        <div className="space-y-4">
          {lowStock.map((p) => (
            <div
              key={p.id}
              className="bg-red-100 border border-red-300 p-4 rounded-xl flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-red-600" size={30} />
                <div>
                  <h2 className="font-bold text-lg">{p.name}</h2>
                  <p className="text-red-700">
                    Stok tersisa: <strong>{p.stock}</strong> (Minimum: {p.min})
                  </p>
                </div>
              </div>

              <Link
                to="/admin/stock-in"
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <PlusCircle size={18} /> Tambah Stok
              </Link>
            </div>
          ))}
        </div>
      )}

    </>
  );
}
