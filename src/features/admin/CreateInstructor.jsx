import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  UserPlus,
  Mail,
  Lock,
  Briefcase,
  Image as ImageIcon,
} from "lucide-react";
import api from "../../utils/axios";

const CreateInstructor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    bio: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("specialization", formData.specialization);
      data.append("bio", formData.bio);
      if (formData.profileImage)
        data.append("profileImage", formData.profileImage);

      await api.post("/instructor/create", data);

      toast.success("Instructor created successfully!");
      navigate("/admin/instructor-management");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create instructor",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)] p-6 bg-gray-50/30">
      <div className="max-w-3xl w-full bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-sm text-gray-400 hover:text-blue-600 transition mb-2"
          >
            <ArrowLeft size={16} className="mr-1" /> Back to List
          </button>
          <h2 className="text-2xl font-bold text-gray-800">
            Add New Instructor
          </h2>
          <p className="text-sm text-gray-500">
            Create a new account for your teaching staff.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Image Upload */}
            <div className="md:col-span-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 p-6 rounded-2xl bg-gray-50/50">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4 text-gray-400">
                  <ImageIcon size={32} />
                </div>
              )}
              <label className="cursor-pointer bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
                Upload Photo
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                Full Name
              </label>
              <div className="relative">
                <UserPlus
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="instructor@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Specialization */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                Specialization
              </label>
              <div className="relative">
                <Briefcase
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  name="specialization"
                  placeholder="e.g. Data Science"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
              About Instructor (Bio)
            </label>
            <textarea
              name="bio"
              rows="3"
              placeholder="Tell us about their expertise..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition resize-none"
              onChange={handleChange}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 py-3 text-gray-500 font-semibold hover:bg-gray-100 rounded-2xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-[2] py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition disabled:bg-blue-300"
            >
              {loading ? "Creating Account..." : "Create Instructor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInstructor;
