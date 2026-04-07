import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";
import useEditCourse from "../../hooks/admin/UseEditCourse";

const EditCourse = () => {
  const navigate = useNavigate();
  const {
    formData,
    loading,
    instructors,
    preview,
    handleChange,
    handleImageChange,
    handleUpdate,
  } = useEditCourse();

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-500 hover:text-gray-700 mb-2 transition"
            >
              <ArrowLeft size={18} className="mr-1" /> Back
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Edit Course</h1>
          </div>
        </div>

        <form
          onSubmit={handleUpdate}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left Column: Form Fields */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Course Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Instructor
                  </label>
                  <select
                    name="instructor"
                    value={formData.instructor}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  >
                    <option value="">Select Instructor</option>
                    {instructors.map((inst) => (
                      <option key={inst._id} value={inst._id}>
                        {inst.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price (Rs.)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                  className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Right Column: Image & Actions */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Course Cover
              </label>

              <div className="relative group mb-4">
                <div className="w-full aspect-video rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                      <ImageIcon size={48} strokeWidth={1} />
                      <span className="text-xs mt-2">No image selected</span>
                    </div>
                  )}
                </div>
              </div>

              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              <label
                htmlFor="file-upload"
                className="block w-full text-center bg-blue-50 text-blue-600 py-3 rounded-xl font-semibold cursor-pointer hover:bg-blue-100 transition"
              >
                Change Image
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-200 transition disabled:bg-blue-300"
            >
              {loading ? (
                "Saving Changes..."
              ) : (
                <>
                  <Save size={20} /> Update Course
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/course-management")}
              className="w-full bg-white text-gray-500 py-4 rounded-2xl font-semibold border border-gray-200 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;
