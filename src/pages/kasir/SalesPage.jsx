import { useEffect, useState } from "react";
import api from "../../services/api";
import Swal from "sweetalert2";

import Input from "../../components/form/Input";
import ComponentCard from "../../components/common/ComponentCard";
import BaseTable from "../../components/tables/BaseTable";
import Button from "../../components/ui/button";

import { Plus, Minus, Trash } from "lucide-react";

/* ======================
   FORMAT
====================== */
const formatCurrency = (v = 0) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(v);

export default function CashierPage() {
  /* ======================
     STATE
  ====================== */
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ======================
     FETCH PRODUCTS
  ====================== */
  const fetchProducts = async () => {
    const res = await api.get("/products", {
      params: { search },
    });
    setProducts(res.data.data || []);
  };

  useEffect(() => {
    fetchProducts();
  }, [search]);

  /* ======================
     CART HANDLER
  ====================== */
  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.product_id === product.id);
      if (exist) {
        return prev.map((i) =>
          i.product_id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [
        ...prev,
        {
          product_id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ];
    });
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.product_id !== id));
    } else {
      setCart((prev) =>
        prev.map((i) =>
          i.product_id === id ? { ...i, quantity: qty } : i
        )
      );
    }
  };

  const total = cart.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  /* ======================
     SUBMIT TRANSACTION
  ====================== */
  const handlePay = async () => {
    if (cart.length === 0) {
      Swal.fire("Oops", "Keranjang masih kosong", "warning");
      return;
    }

    try {
      setLoading(true);

      await api.post("/sales", {
        items: cart.map((i) => ({
          product_id: i.product_id,
          quantity: i.quantity,
        })),
      });

      Swal.fire("Berhasil", "Transaksi berhasil", "success");
      setCart([]);
      fetchProducts();
    } catch (err) {
      Swal.fire(
        "Gagal",
        err.response?.data?.message || "Transaksi gagal",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     TABLE CONFIG
  ====================== */
  const productColumns = [
    { key: "name", label: "Produk" },
    {
      key: "price",
      label: "Harga",
      render: (row) => formatCurrency(row.price),
    },
    {
      key: "stock",
      label: "Stok",
    },
    {
      key: "action",
      label: "",
      render: (row) => (
        <Button size="sm" onClick={() => addToCart(row)}>
          <Plus size={14} />
        </Button>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* ======================
          LEFT: PRODUCT LIST
      ====================== */}
      <div className="col-span-12 lg:col-span-7">
        <ComponentCard>
          <Input
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <BaseTable columns={productColumns} data={products} />
        </ComponentCard>
      </div>

      {/* ======================
          RIGHT: CART
      ====================== */}
      <div className="col-span-12 lg:col-span-5">
        <ComponentCard>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/70">Keranjang</h3>

          {cart.length === 0 ? (
            <p className="text-sm text-gray-500">Belum ada item</p>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.product_id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {formatCurrency(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        updateQty(item.product_id, item.quantity - 1)
                      }
                    >
                      <Minus size={14} />
                    </Button>

                    <span>{item.quantity}</span>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        updateQty(item.product_id, item.quantity + 1)
                      }
                    >
                      <Plus size={14} />
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        updateQty(item.product_id, 0)
                      }
                    >
                      <Trash size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SUMMARY */}
          <div className="mt-6 flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-800 dark:text-white/70">Total</span>
            <span className="text-lg font-bold text-gray-800 dark:text-white/70">
              {formatCurrency(total)}
            </span>
          </div>

          <Button
            className="mt-4 w-full"
            onClick={handlePay}
            disabled={loading}
          >
            {loading ? "Memproses..." : "Bayar (Cash)"}
          </Button>
        </ComponentCard>
      </div>
    </div>
  );
}
