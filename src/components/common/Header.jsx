import React, { useState, useContext } from "react";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  User as UserIcon,
  LayoutDashboard,
} from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const { state, logout } = useContext(AuthContext);
  const { userInfo } = state;
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const getDashboardPath = () => {
    if (userInfo?.role === "Admin") return "/admin/dashboard";
    if (userInfo?.role === "Instructor") return "/instructor/dashboard";
    return "/user/dashboard";
  };

  return (
    <nav className="bg-[#F1F8F9] border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              <img className="h-32 w-auto " src="/lmslogo.png" />
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              to="/courses"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Courses
            </Link>
            <Link
              to="/blogs"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Blogs
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Contact
            </Link>
          </div>

          {/* RIGHT: Profile / Login */}
          <div className="hidden md:flex items-center">
            {userInfo ? (
              <div
                className="relative"
                onMouseEnter={() => setProfileDropdown(true)}
                onMouseLeave={() => setProfileDropdown(false)}
              >
                <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition focus:outline-none">
                  <img
                    className="w-9 h-9 rounded-full object-cover border border-gray-200"
                    src={
                      userInfo?.profileImage ||
                      userInfo?.profile ||
                      `https://ui-avatars.com/api/?name=${userInfo?.name || "User"}&background=random`
                    }
                    alt={userInfo?.name || "Profile"}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {userInfo.name}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform ${profileDropdown ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Profile Dropdown */}
                {profileDropdown && (
                  <div className="absolute right-0 w-48 pt-2">
                    <div className="bg-white border border-gray-200 rounded-md shadow-lg py-1 overflow-hidden">
                      <Link
                        to={getDashboardPath()}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center border-b border-gray-50"
                      >
                        <LayoutDashboard
                          size={16}
                          className="mr-2 text-blue-600"
                        />{" "}
                        Dashboard
                      </Link>

                      <Link
                        to="/profile"
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <UserIcon size={16} className="mr-2" /> Profile
                      </Link>

                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center transition-colors"
                      >
                        <LogOut size={16} className="mr-2" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-2">
          <Link
            to="/"
            className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md"
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md"
          >
            Courses
          </Link>
          <Link
            to="/blogs"
            className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md"
          >
            Blogs
          </Link>

          <div className="border-t border-gray-100 pt-2">
            {userInfo ? (
              <>
                <div className="flex items-center px-3 py-2 space-x-3 mb-2">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={userInfo?.profile}
                    alt=""
                  />
                  <span className="font-bold text-blue-600">
                    Hello, {userInfo.name}
                  </span>
                </div>
                {/* Dashboard Link in Mobile Menu */}
                <Link
                  to={getDashboardPath()}
                  className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md"
                >
                  My Profile
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 text-blue-600 font-bold"
              >
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
