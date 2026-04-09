import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Image as ImageIcon,
  Plus,
  Trash2,
} from "lucide-react";
import useEditCourse from "../../hooks/admin/UseEditCourse";


const EditCourse = () => {
  const navigate = useNavigate();
  const {
    formData,
    loading,
    instructors,
    preview,
    handleChange,
    handleArrayChange,
    addArrayField,
    removeArrayField,
    handleImageChange,
    handleUpdate,
  } = useEditCourse();

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-500 hover:text-gray-700 mb-4 transition"
        >
          <ArrowLeft size={18} className="mr-1" /> Back
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Course</h1>

        <form
          onSubmit={handleUpdate}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 space-y-6">
            {/* General Info Card */}
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

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  YouTube URL
                </label>
                <input
                  type="text"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  required
                />
              </div>
            </div>

            {/* SYLLABUS SECTION */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">
                  Syllabus Outlines
                </h2>
                <button
                  type="button"
                  onClick={() => addArrayField("syllabus")}
                  className="text-blue-600 flex items-center text-sm font-bold bg-blue-50 px-3 py-1 rounded-lg hover:bg-blue-100 transition"
                >
                  <Plus size={16} className="mr-1" /> Add Topic
                </button>
              </div>
              <div className="space-y-3">
                {formData.syllabus.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handleArrayChange(index, e.target.value, "syllabus")
                      }
                      className="flex-1 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="e.g. Module 1: Introduction"
                    />
                    {formData.syllabus.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField(index, "syllabus")}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* PREREQUISITES SECTION */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">
                  Prerequisites
                </h2>
                <button
                  type="button"
                  onClick={() => addArrayField("prerequisites")}
                  className="text-green-600 flex items-center text-sm font-bold bg-green-50 px-3 py-1 rounded-lg hover:bg-green-100 transition"
                >
                  <Plus size={16} className="mr-1" /> Add Requirement
                </button>
              </div>
              <div className="space-y-3">
                {formData.prerequisites.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handleArrayChange(
                          index,
                          e.target.value,
                          "prerequisites",
                        )
                      }
                      className="flex-1 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="e.g. Basic JS Knowledge"
                    />
                    {formData.prerequisites.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField(index, "prerequisites")}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Actions */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <div className="w-full aspect-video rounded-xl overflow-hidden bg-gray-100 border border-gray-200 mb-4">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon size={48} className="mx-auto mt-8 text-gray-300" />
                )}
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
                className="block w-full bg-blue-50 text-blue-600 py-3 rounded-xl font-semibold cursor-pointer hover:bg-blue-100 transition"
              >
                Change Image
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg transition disabled:bg-blue-300"
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
