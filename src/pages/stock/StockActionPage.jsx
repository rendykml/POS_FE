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
    const res = await api.get("/warehouse/stocks");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  /* ======================
     SUBMIT STOCK ACTION
  ====================== */
  const handleSubmit = async ({ quantity, note }) => {
    try {
      setLoadingSubmit(true);

      await api.post(
        actionType === "IN"
          ? "/warehouse/stock-in"
          : "/warehouse/stock-out",
        {
          product_id: selectedProduct.id,
          quantity,
          note,
        }
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
      <PageBreadcrumb pageTitle="Gudang" />

      <ComponentCard className="p-0">
        {/* HEADER */}
        <div className="flex items-center pb-4 justify-between border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-base font-medium text-gray-800 dark:text-white/90">
            Stok Gudang
          </h2>
        </div>

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
