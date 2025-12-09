export default function Unauthorized() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Unauthorized</h1>
      <p className="text-gray-600 text-lg">
        Anda tidak memiliki akses untuk membuka halaman ini.
      </p>
    </div>
  );
}
