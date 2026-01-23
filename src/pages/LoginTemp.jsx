import { useState } from "react";
import { User, Lock, LogIn } from "lucide-react";
import axios from "../services/api";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/login", {
        email,
        password,
      });

      // simpan ke auth context
      login({
        user: res.data.user,
        token: res.data.token,
      });

      // redirect sesuai role
      const role = res.data.user.role;
      if (role === "admin") navigate("/admin");
      else if (role === "kasir") navigate("/kasir");
      else if (role === "gudang") navigate("/gudang");
      else navigate("/");

    } catch (err) {
      if (!err.response) {
        setError(
          "Tidak dapat terhubung ke server. Pastikan backend berjalan."
        );
      } else if (err.response.status === 401) {
        setError("Email atau password salah.");
      } else {
        setError(
          err.response.data?.message || "Terjadi kesalahan saat login."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: `url("/images/login2.jpg")` }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="relative opacity-90 bg-white shadow-2xl rounded-3xl p-8 sm:p-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-4 rounded-full shadow-lg">
            <LogIn className="w-8 h-8 text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Login
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Masuk ke sistem POS
        </p>

        <div className="space-y-5">
          {/* EMAIL */}
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                <User className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full bg-gradient-to-r from-cyan-500 to-blue-400 text-white py-3 rounded-xl font-semibold transition
              ${loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}
            `}
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </div>

        <p className="text-center text-gray-400 text-xs mt-8">
          © 2025 POS System
        </p>
      </div>
    </div>
  );
}
