import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../../utils/axios";
import { toast } from "react-toastify";
import { ArrowLeft, Save, User as UserIcon } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { state, logout } = useContext(AuthContext);
  console.log(state);

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Student",
  });

  useEffect(() => {
    if (location.state && location.state.user) {
      const { name, email, role } = location.state.user;
      setFormData({ name, email, role });
      setLoading(false);
    } else {
      toast.error("User data not found.");
      navigate("/admin/user-management");
    }
  }, [location.state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/edit/${id}`, formData, { withCredentials: true });

      // FIX: Use .id instead of ._id based on your console log
      // Also, use 'state.userInfo' because that is where your data is stored
      const isEditingSelf = String(state?.userInfo?.id) === String(id);

      if (isEditingSelf) {
        toast.success("Profile updated. Logging out for security...");

        localStorage.clear();
        sessionStorage.clear();

        try {
          await api.post("/users/logout");
        } catch (err) {
          console.error("Backend logout failed");
        }

        if (logout) logout();
        window.location.href = "/login";
      } else {
        toast.success("User updated successfully!");
        navigate("/admin/user-management");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading)
    return (
      <div className="p-10 text-center font-bold text-blue-600">
        Loading User Data...
      </div>
    );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 font-bold"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="max-w-2xl bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-50 bg-gray-50/50">
          <h2 className="text-2xl font-black text-gray-800 flex items-center gap-2">
            <UserIcon className="text-blue-600" /> Edit User Profile
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage permissions and account details.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black uppercase text-gray-400 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-gray-400 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 outline-none transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-gray-400 mb-2">
              Account Role
            </label>
            <div className="relative">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 outline-none transition appearance-none"
              >
                <option value="Student">Student</option>
                <option value="Instructor">Instructor</option>
                <option value="Admin">Admin</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                ▼
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-100"
          >
            <Save size={18} /> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
