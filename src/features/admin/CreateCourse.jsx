import { useNavigate } from "react-router-dom";
import { Save, Image as ImageIcon, ArrowLeft } from "lucide-react";
import useCreateCourse from "../../hooks/admin/useCreateCourse";

const CreateCourse = () => {
  const navigate = useNavigate();
  const {
    loading,
    preview,
    instructors,
    handleChange,
    handleFileChange,
    handleSubmit,
    courseData,
  } = useCreateCourse();

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-500 hover:text-gray-700 mb-4 transition"
        >
          <ArrowLeft size={18} className="mr-1" /> Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Create New Course
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Main Content Card */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Course Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={courseData.title}
                    onChange={handleChange}
                    placeholder="e.g. Full Stack Web Development"
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Instructor
                  </label>
                  <select
                    name="instructor"
                    value={courseData.instructor}
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Price (Rs.)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={courseData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={courseData.duration}
                      onChange={handleChange}
                      placeholder="e.g. 3 Months"
                      className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={courseData.description}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Describe what students will learn..."
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Card: Image & Actions */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <label className="block text-sm font-semibold text-gray-700 mb-4 text-left">
                Course Ccourse
              </label>

              <div className="w-full aspect-video rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden mb-4">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400">
                    <ImageIcon size={40} className="mx-auto mb-2 opacity-50" />
                    <p className="text-xs">No image selected</p>
                  </div>
                )}
              </div>

              <input
                type="file"
                id="course-image"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <label
                htmlFor="course-image"
                className="inline-block w-full py-3 bg-blue-50 text-blue-600 rounded-xl font-bold cursor-pointer hover:bg-blue-100 transition"
              >
                Upload Image
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-100 disabled:bg-blue-300"
            >
              {loading ? (
                "Creating..."
              ) : (
                <>
                  <Save size={20} /> Create Course
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
