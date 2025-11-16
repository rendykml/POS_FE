export default function Login() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          POS Login
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Masuk ke sistem untuk melanjutkan
        </p>

        <div className="mb-4">
          <label className="text-gray-700 text-sm font-semibold">Username</label>
          <input
            type="text"
            placeholder="Masukkan username"
            className="mt-1 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="text-gray-700 text-sm font-semibold">Password</label>
          <input
            type="password"
            placeholder="Masukkan password"
            className="mt-1 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
        >
          Login
        </button>

        <p className="text-center text-gray-500 text-sm mt-6">
          © 2025 POS System — All Rights Reserved
        </p>
      </div>
    </div>
  );
}
