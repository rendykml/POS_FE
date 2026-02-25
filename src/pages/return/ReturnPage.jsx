import { useEffect, useState } from "react";
import api from "../../services/api";
import Swal from "sweetalert2";

import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button";

import { Plus } from "lucide-react";

import ReturnTable from "../../components/tables/ReturnTable";
import ReturnFormModal from "../../components/modals/ReturnFormModal";

export default function ReturnPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  const [returns, setReturns] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const handleDetail = async (id) => {
    try {
      setLoadingDetail(true);

      const res = await api.get(`/returns/${id}`);
      setSelectedReturn(res.data.data);

      setSelectedReturn(data.data);
    } catch (error) {
      console.error("Gagal ambil detail", error);
    } finally {
      setLoadingDetail(false);
    }
  };

  const fetchReturns = async () => {
    const res = await api.get("/returns");
    setReturns(res.data.data);
  };

  useEffect(() => {
    fetchReturns();
  }, []);

  const handleSubmit = async (data, setError) => {
    try {
      setLoadingSubmit(true);

      await api.post("/returns", data);

      Swal.fire("Berhasil", "Return berhasil diajukan", "success");
      setModalOpen(false);
      fetchReturns();
    } catch (err) {
      setError(
        err.response?.data?.error || "Terjadi kesalahan saat menyimpan return",
      );
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleApprove = async (id) => {
    const confirm = await Swal.fire({
      title: "Approve return?",
      icon: "question",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    await api.post(`/returns/${id}/approve`);
    fetchReturns();
    Swal.fire("Berhasil", "Return disetujui", "success");
  };

  const handleReject = async (id) => {
    const confirm = await Swal.fire({
      title: "Tolak return?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    await api.post(`/returns/${id}/reject`);
    fetchReturns();
    Swal.fire("Berhasil", "Return ditolak", "success");
  };

  return (
    <div>
      <PageMeta title="Manajemen Return | POS" />
      <PageBreadcrumb pageTitle="Manajemen Return" />

      <ComponentCard className="p-0">
        <div className="flex items-center pb-4 justify-between border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            Daftar Return
          </h3>

          <Button
            size="sm"
            variant="primary"
            startIcon={<Plus size={16} />}
            onClick={() => setModalOpen(true)}
          >
            Ajukan Return
          </Button>
        </div>

        <ReturnTable
          returns={returns}
          role={role}
          onDetail={handleDetail}
          onApprove={handleApprove}
          onReject={handleReject}
        />
        {selectedReturn && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-[600px] max-h-[80vh] overflow-y-auto">
              <h2 className="text-lg font-semibold mb-4">
                Detail Return #{selectedReturn.id}
              </h2>

              <p>
                <strong>Invoice:</strong> {selectedReturn.sale?.invoice_number}
              </p>
              <p>
                <strong>Status:</strong> {selectedReturn.status}
              </p>
              <p>
                <strong>Total Refund:</strong> Rp {selectedReturn.total_refund}
              </p>
              <p>
                <strong>Reason:</strong> {selectedReturn.reason || "-"}
              </p>

              <hr className="my-4" />

              <h3 className="font-medium mb-2">Items:</h3>

              {selectedReturn.items.map((item) => (
                <div key={item.id} className="mb-2 border-b pb-2">
                  <p>Produk: {item.sale_item?.product?.name}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>Subtotal: Rp {item.subtotal}</p>
                </div>
              ))}

              <div className="text-right mt-4">
                <button
                  onClick={() => setSelectedReturn(null)}
                  className="px-4 py-2 bg-gray-600 text-white rounded"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </ComponentCard>

      <ReturnFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        loading={loadingSubmit}
      />
    </div>
  );
}
