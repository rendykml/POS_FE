import { useAuthStore } from "../store/authStore";
import { LogOut } from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const role = useAuthStore((state) => state.role);
  //const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Anda yakin ingin keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          title: "Berhasil Logout",
          text: "Anda telah keluar dari akun.",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });

        setTimeout(() => navigate("/login"), 1500);
      }
    });
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-sm">
      <h2 className="text-xl font-bold capitalize">Dashboard {role}</h2>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        <LogOut size={18} /> Logout
      </button>
    </header>
  );
}
