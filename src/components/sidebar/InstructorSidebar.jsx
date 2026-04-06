import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { menuItems } from "../../functions/instructorMenu";

const InstructorSidebar = () => {
  const { logout, state } = useContext(AuthContext);
  const { userInfo } = state;
  const location = useLocation();

  return (
    <div className="flex flex-col w-64 bg-white h-screen border-r border-gray-200 sticky top-0">
      {/* Sidebar Header - Instructor Info */}
      <div className="p-6 border-b border-gray-100 flex flex-col items-center">
        <img
          className="w-20 h-20 rounded-full object-cover border-2 border-blue-500 p-1"
          src={
            userInfo?.profileImage ||
            userInfo?.profile ||
            "https://via.placeholder.com/150"
          }
          alt="Instructor"
        />
        <h3 className="mt-3 font-bold text-gray-800 text-lg">
          {userInfo?.name}
        </h3>
        <p className="text-xs text-blue-600 font-semibold tracking-wider uppercase">
          {userInfo?.role}
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={logout}
          className="flex items-center space-x-3 w-full p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors font-medium"
        >
          <FaSignOutAlt className="text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default InstructorSidebar;
