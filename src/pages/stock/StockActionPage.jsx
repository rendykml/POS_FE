import { useEffect, useState } from "react";
import api from "../../services/api";

import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";

import WarehouseStockTable from "../../components/tables/StockTable";
import StockActionModal from "../../components/modals/StockActionFormModal";

export default function WarehousePage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [actionType, setActionType] = useState(null); // "IN" | "OUT"
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  /* ======================
     FETCH STOCK
  ====================== */
  const fetchStocks = async () => {
    const res = await api.get("/warehouse");
    setProducts(res.data);
  };

  const fetchRestockRecommendation = async () => {
    try {
      const res = await api.get("/warehouse/restock-recommendation");
      console.log("RESTOCK RESPONSE:", res.data);
      setRestockItems(res.data.data || []);
    } catch (err) {
      console.error("RESTOCK ERROR:", err.response || err);
    }
  };

  const [restockItems, setRestockItems] = useState([]);

  useEffect(() => {
    fetchStocks();
    fetchRestockRecommendation();
  }, []);

  /* ======================
     SUBMIT STOCK ACTION
  ====================== */
  const handleSubmit = async ({ quantity, note }) => {
    try {
      setLoadingSubmit(true);

      await api.post(
        actionType === "IN" ? "/warehouse/stock-in" : "/warehouse/stock-out",
        {
          product_id: selectedProduct.id,
          quantity,
          note,
        },
      );

      setActionType(null);
      setSelectedProduct(null);
      fetchStocks();
    } finally {
      setLoadingSubmit(false);
    }
  };

  /* ======================
     RENDER
  ====================== */
  return (
    <div>
      <PageMeta title="Gudang | POS" />
      <PageBreadcrumb pageTitle="Kelola Gudang" />

      <ComponentCard className="p-0">
        {/* HEADER */}
        <div className="flex items-center pb-4 justify-between border-b border-gray-200 dark:border-gray-500">
          <h2 className="text-base font-medium text-gray-800 dark:text-white/90">
            Stok Gudang
          </h2>
        </div>

        {restockItems.length > 0 && (
          <ComponentCard className="mb-6 border border-red-200 bg-red-50">
            <h3 className="text-sm font-semibold text-red-700 mb-3">
              Rekomendasi Restock
            </h3>

            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-red-600">
                  <th>Produk</th>
                  <th>Stok Saat Ini</th>
                  <th>Rekomendasi Order</th>
                </tr>
              </thead>
              <tbody>
                {restockItems.map((item) => (
                  <tr key={item.product_id}>
                    <td>{item.name}</td>
                    <td>{item.current_stock}</td>
                    <td className="font-semibold">{item.recommended_order}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ComponentCard>
        )}

        {/* TABLE */}
        <WarehouseStockTable
          products={products}
          onStockIn={(product) => {
            setSelectedProduct(product);
            setActionType("IN");
          }}
          onStockOut={(product) => {
            setSelectedProduct(product);
            setActionType("OUT");
          }}
        />
      </ComponentCard>

      {/* MODAL */}
      <StockActionModal
        isOpen={!!actionType}
        type={actionType}
        product={selectedProduct}
        loading={loadingSubmit}
        onClose={() => {
          setActionType(null);
          setSelectedProduct(null);
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
