import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";
import UserSidebar from "../components/sidebar/UserSidebar";

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    // Change to h-screen
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <UserSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Scrollable area for content */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          <div className="md:hidden flex items-center p-4 bg-white shadow sticky top-0 z-10">
            <button onClick={() => setSidebarOpen(true)}>
              <Menu />
            </button>
            <h1 className="ml-4 font-bold">User Panel</h1>
          </div>

          <main className="flex-1 p-4 md:p-6 bg-gray-100">
            <Outlet />
          </main>

        </div>
      </div>
    </div>
  );
};

export default UserLayout;
