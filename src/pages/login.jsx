import { User, Lock, LogIn } from "lucide-react";

export default function Login() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4 relative"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1542744173-8e7e53415bb0")`,
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>

      {/* Login Card */}
      <div className="relative bg-white/85 backdrop-blur-lg border border-mint-200 shadow-2xl rounded-3xl p-8 sm:p-10 w-full max-w-md">
        
        {/* Logo/Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-green-500 shadow-lg">
            <LogIn className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-700 text-center mb-2">
          Selamat Datang
        </h1>

        <p className="text-center text-gray-500 mb-8 text-sm sm:text-base">
          Masuk ke sistem POS untuk melanjutkan
        </p>

        {/* Form */}
        <div className="space-y-5">

          {/* Username */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="w-5 h-5 text-cyan-500" />
              </div>
              <input
                type="text"
                placeholder="Masukkan username"
                className="w-full pl-12 pr-4 py-3 border border-mint-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-cyan-500" />
              </div>
              <input
                type="password"
                placeholder="Masukkan password"
                className="w-full pl-12 pr-4 py-3 border border-mint-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none"
              />
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-green-400 text-green-500 focus:ring-green-500"
              />
              <span className="ml-2 text-gray-600">Ingat saya</span>
            </label>
            <a href="#" className="text-cyan-600 hover:text-cyan-700 font-semibold">
              Lupa password?
            </a>
          </div>

          {/* Login Button */}
          <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-xl transition shadow-md hover:shadow-lg">
            Masuk
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-mint-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white/90 text-gray-500">atau</span>
          </div>
        </div>

        {/* Register */}
        <p className="text-center text-gray-600 text-sm">
          Belum punya akun?{" "}
          <a href="#" className="text-green-600 hover:text-green-700 font-semibold">
            Daftar sekarang
          </a>
        </p>

        {/* Footer */}
        <p className="text-center text-gray-400 text-xs mt-8">
          © 2025 POS System — All Rights Reserved
        </p>
      </div>
    </div>
  );
}
