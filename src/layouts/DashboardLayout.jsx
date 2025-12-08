import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Content */}
      <div className="flex-1 bg-gray-100 min-h-screen">
        <Header />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
