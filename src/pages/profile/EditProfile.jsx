import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../utils/axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { Save, ArrowLeft, Camera } from "lucide-react";

const EditProfile = () => {
  const { state } = useLocation(); // Data passed from Profile.jsx
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profile: null, // For the new file
  });

  // Pre-fill the form with existing data from state
  useEffect(() => {
    if (state) {
      setFormData({
        name: state.name || "",
        email: state.email || "",
        profile: null,
      });
    }
  }, [state]);

  const handleChange = (e) => {
    if (e.target.name === "profile") {
      setFormData({ ...formData, profile: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // 1. Prepare the Data
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      if (formData.profile) {
        data.append("profile", formData.profile);
      }

      // 2. Check if the email is actually changing before sending the request
      const isEmailChanging = formData.email !== state.email;

      // 3. Send Update Request
      await api.put(`/users/edit/${state.id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success("Profile updated successfully!");

      if (isEmailChanging) {
        // SCENARIO A: Email changed - Force Logout
        toast.info("Email changed. Please login with your new email.");

        localStorage.clear();
        sessionStorage.clear();

        try {
          await api.post("/users/logout");
        } catch (err) {
          console.error("Logout cleanup failed");
        }

        if (logout) logout();
        window.location.href = "/login";
      } else {
        // SCENARIO B: Email stayed the same - Keep Login
        // Just go back to the profile page
        navigate("/profile");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 font-bold text-gray-600"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-black mb-6">Update Your Profile</h2>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase text-gray-400 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
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
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-gray-400 mb-2">
              Profile Picture
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                name="profile"
                onChange={handleChange}
                className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
          >
            <Save size={18} /> Save Profile Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
