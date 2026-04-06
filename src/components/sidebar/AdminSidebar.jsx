import { NavLink, useNavigate } from "react-router-dom";
import { AdminMenu } from "../../functions/adminMenu";

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const navLinkClass = (isActive) =>
    `flex items-center gap-2 p-2 rounded ${
      isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
    }`;
  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-transparent md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white p-4 z-50
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block
        `}
      >
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <nav className="flex flex-col gap-3">
          {AdminMenu.map((item, index) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) => navLinkClass(isActive)}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={20} />
                {item.label || item.name}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
