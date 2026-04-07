import { ArrowLeft, User, Mail, Award, AlignLeft } from "lucide-react";
import useEditInstructor from "../../hooks/admin/useEditInstructor";

const EditInstructor = () => {
  const { loading,
    formData,
    handleChange,
    handleUpdate} = useEditInstructor()

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)] p-6 bg-gray-50/30">
      <div className="max-w-2xl w-full bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        {/* Navigation Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-sm text-gray-400 hover:text-blue-600 transition mb-1"
            >
              <ArrowLeft size={16} className="mr-1" /> Back
            </button>
            <h2 className="text-2xl font-bold text-gray-800">
              Edit Instructor
            </h2>
          </div>
          <img 
          className="w-12 h-12 rounded-full object-cover"
          src={formData?.profileImage} alt={formData?.name} />
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
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
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>
            </div>
          </div>

          {/* Specialization */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
              Specialization
            </label>
            <div className="relative">
              <Award
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="e.g. MERN Stack Developer"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
              Short Bio
            </label>
            <div className="relative">
              <AlignLeft
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition resize-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate("/admin/instructor-management")}
              className="flex-1 py-3 text-gray-500 font-semibold hover:bg-gray-100 rounded-2xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-[2] py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition disabled:bg-blue-300"
            >
              {loading ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInstructor;
