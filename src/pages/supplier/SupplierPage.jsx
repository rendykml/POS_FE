import { useEffect, useState } from "react";
import api from "../../services/api";

import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button";

import SupplierTable from "../../components/tables/SupplierTable";
import SupplierFormModal from "../../components/modals/SupplierFormModal";

export default function SupplierPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/suppliers");
      setSuppliers(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <div>
      <PageMeta title="Supplier | POS" />
      <PageBreadcrumb pageTitle="Supplier" />

      <ComponentCard>
        <div className="flex justify-between mb-4">
          <h2 className="text-base font-medium text-gray-800 dark:text-white/90">
            Daftar Supplier
          </h2>
          <Button
            onClick={() => {
              setSelected(null);
              setOpenForm(true);
            }}
          >
            Tambah Supplier
          </Button>
        </div>

        <SupplierTable
          suppliers={suppliers}
          onEdit={(supplier) => {
            setSelected(supplier);
            setOpenForm(true);
          }}
          onReload={fetchSuppliers}
        />
      </ComponentCard>

      <SupplierFormModal
        isOpen={openForm}
        supplier={selected}
        onClose={() => {
          setSelected(null);
          setOpenForm(false);
        }}
        onSuccess={() => {
          fetchSuppliers();
          setOpenForm(false);
          setSelected(null);
        }}
      />
    </div>
  );
}
