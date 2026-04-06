import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";
import AdminSidebar from "../components/sidebar/AdminSidebar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="flex-1 flex flex-col  overflow-y-auto">
          <div className="md:hidden flex items-center p-4 bg-white shadow sticky top-0 z-10">
            <button onClick={() => setSidebarOpen(true)}>
              <Menu />
            </button>
            <h1 className="ml-4 font-bold">Admin Panel</h1>
          </div>

          <main className="flex-1 p-4 md:p-6 bg-gray-100">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
