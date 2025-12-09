import { useState } from "react";
import { User, Lock, LogIn } from "lucide-react";
import axios from "../utils/axios";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Kalo udah ada backend, aktifin ini
  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/login", {
        username,
        password,
      });

      login({
        user: res.data.user,
        token: res.data.token,
        role: res.data.user.role,
      });

      // redirect sesuai role
      if (res.data.user.role === "admin") navigate("/admin");
      if (res.data.user.role === "kasir") navigate("/kasir");
      if (res.data.user.role === "gudang") navigate("/gudang");
    } catch (err) {
      // SERVER TIDAK MERESPON
      if (!err.response) {
        setError(
          "Tidak dapat terhubung ke server. Periksa koneksi internet atau server belum berjalan."
        );
      }

      // STATUS DIKIRIM DARI BACKEND
      else if (err.response.status === 401) {
        setError("Username atau password salah!");
      } else if (err.response.status === 500) {
        setError("Terjadi kesalahan pada server. Coba beberapa saat lagi.");
      } else {
        setError("Terjadi kesalahan saat mencoba login.");
      }
    } finally {
      setLoading(false); // stop loading
    }
  };

  // Sementara untuk login dummy tanpa backend
  // const handleLogin = async () => {
  //   const dummyUsers = [
  //     {
  //       username: "admin",
  //       password: "admin123",
  //       role: "admin",
  //       token: "admintoken123",
  //     },
  //     {
  //       username: "kasir",
  //       password: "kasir123",
  //       role: "kasir",
  //       token: "kasirtoken123",
  //     },
  //     {
  //       username: "gudang",
  //       password: "gudang123",
  //       role: "gudang",
  //       token: "gudangtoken123",
  //     },
  //   ];

  //   const found = dummyUsers.find(
  //     (u) => u.username === username && u.password === password
  //   );

  //   if (!found) {
  //     alert("Username atau password salah!");
  //     return;
  //   }

  //   // Simpan ke Zustand
  //   login({
  //     user: { username: found.username, role: found.role },
  //     token: found.token,
  //     role: found.role,
  //   });

  //   // Redirect sesuai role
  //   if (found.role === "admin") navigate("/admin");
  //   if (found.role === "kasir") navigate("/kasir");
  //   if (found.role === "gudang") navigate("/gudang");
  // };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: `url("/images/login2.jpg")` }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Login Card */}
      <div className="relative opacity-90 bg-white shadow-2xl rounded-3xl p-8 sm:p-10 w-full max-w-md transition-all duration-300">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-4 rounded-full shadow-lg">
            <LogIn className="w-8 h-8 text-white" />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-2">
          Login
        </h1>

        <p className="text-center text-gray-500 mb-8 text-sm sm:text-base">
          Masuk ke sistem POS untuk melanjutkan
        </p>

        {/* Form */}
        <div className="space-y-5">
          {/* Username Input */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition outline-none"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition outline-none"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full bg-gradient-to-r from-cyan-500 to-blue-400 text-white font-semibold py-3 rounded-xl transition transform hover:scale-105 shadow-lg hover:shadow-xl
    ${loading ? "opacity-50 cursor-not-allowed" : ""}
  `}
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-xs mt-8">
          © 2025 POS System — All Rights Reserved
        </p>
      </div>
    </div>
  );
}
