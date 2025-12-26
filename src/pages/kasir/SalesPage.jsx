import { useState } from "react";
import { Search, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

export default function SalesPage() {
  // DUMMY DATA PRODUK
  const productsDummy = [
    { id: 1, name: "Kemeja Polos", price: 120000 },
    { id: 2, name: "Celana Jeans", price: 200000 },
    { id: 3, name: "Jaket Hoodie", price: 180000 },
    { id: 4, name: "Kaos Oversize", price: 90000 },
  ];

  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  const filteredProducts = productsDummy.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product) => {
    const existing = cart.find((c) => c.id === product.id);

    if (existing) {
      setCart(
        cart.map((c) => (c.id === product.id ? { ...c, qty: c.qty + 1 } : c))
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;

    setCart(cart.map((c) => (c.id === id ? { ...c, qty: qty } : c)));
  };

  const removeItem = (id) => {
    setCart(cart.filter((c) => c.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // pembayaran
  const [pay, setPay] = useState("");
  const change = pay ? pay - total : 0;

  const processPayment = () => {
    if (cart.length === 0) {
      Swal.fire(
        "Keranjang kosong",
        "Tambahkan produk terlebih dahulu",
        "warning"
      );
      return;
    }

    if (!pay || pay < total) {
      Swal.fire(
        "Pembayaran kurang",
        "Uang bayar belum mencukupi total belanja",
        "error"
      );
      return;
    }

    Swal.fire({
      title: "Transaksi Berhasil",
      text: `Kembalian: Rp ${change.toLocaleString()}`,
      icon: "success",
    });

    setCart([]);
    setPay("");
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Transaksi Penjualan</h1>

      {/* SEARCH PRODUCT */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <div className="flex items-center gap-3 border p-3 rounded-lg">
          <Search className="text-gray-500" />
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none"
          />
        </div>

        {/* LIST PRODUK */}
        {search && (
          <div className="mt-4 border rounded-lg p-3 bg-gray-50">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="flex justify-between p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => addToCart(p)}
              >
                <span>{p.name}</span>
                <span>Rp {p.price.toLocaleString()}</span>
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <p className="text-gray-500 text-center p-2">
                Produk tidak ditemukan
              </p>
            )}
          </div>
        )}
      </div>

      {/* CART */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Keranjang */}
        <div className="lg:col-span-2 bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-3">Keranjang</h2>

          {cart.length === 0 && (
            <p className="text-gray-500">Keranjang masih kosong</p>
          )}

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-3"
            >
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-500 text-sm">
                  Rp {item.price.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* QTY */}
                <input
                  type="number"
                  className="w-16 border rounded p-1"
                  value={item.qty}
                  onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
                />

                {/* SUBTOTAL */}
                <p className="w-28 text-right font-bold">
                  Rp {(item.price * item.qty).toLocaleString()}
                </p>

                {/* DELETE */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          {/* TOTAL */}
          <div className="text-right mt-4 text-2xl font-bold">
            Total: Rp {total.toLocaleString()}
          </div>
        </div>

        {/* PEMBAYARAN */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-3">Pembayaran</h2>

          <label className="block text-sm font-semibold mb-1">Uang Bayar</label>
          <input
            type="number"
            value={pay}
            onChange={(e) => setPay(e.target.value)}
            className="w-full border p-2 rounded-lg"
          />

          <div className="text-lg mt-3 font-bold">
            Kembalian:
            <span className="text-green-600">
              {" "}
              Rp {change > 0 ? change.toLocaleString() : 0}
            </span>
          </div>

          <button
            onClick={processPayment}
            className="w-full mt-5 bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg"
          >
            Proses Transaksi
          </button>
        </div>
      </div>
    </>
  );
}
