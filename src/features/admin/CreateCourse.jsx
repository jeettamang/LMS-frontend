import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Save,
  Image as ImageIcon,
  ArrowLeft,
  Plus,
  Trash2,
} from "lucide-react";
import useCreateCourse from "../../hooks/admin/useCreateCourse";
import TextFields from "../../components/common/TextFields";

const CreateCourse = () => {
  const navigate = useNavigate();
  const {
    loading,
    preview,
    instructors,
    categories,
    handleChange,
    handleArrayChange,
    addArrayField,
    removeArrayField,
    handleFileChange,
    handleSubmit,
    courseData,
  } = useCreateCourse();

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-500 hover:text-gray-700 mb-4 transition"
        >
          <ArrowLeft size={18} className="mr-1" /> Back
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Create New Course
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 space-y-6">
            {/* Primary Details */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <TextFields
                label="Course title"
                name="title"
                value={courseData.title}
                onChange={handleChange}
                placeholder="e.g. Microsoft Excel Masterclass"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Instructor
                  </label>
                  <select
                    name="instructor"
                    value={courseData.instructor}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
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
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={courseData.category}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <TextFields
                  type="number"
                  label="Price"
                  name="price"
                  value={courseData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                />
                <TextFields
                  type="text"
                  label="Duration"
                  name="duration"
                  value={courseData.duration}
                  onChange={handleChange}
                  placeholder="e.g. 2 months"
                />
              </div>

              <TextFields
                label="YouTube Preview URL"
                name="videoUrl"
                value={courseData.videoUrl}
                onChange={handleChange}
                placeholder="https://youtube.com/..."
              />

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={courseData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  required
                />
              </div>
            </div>

            {/* DYNAMIC SYLLABUS SECTION */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">
                  Course Outlines (Syllabus)
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
                {courseData.syllabus.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handleArrayChange(index, e.target.value, "syllabus")
                      }
                      placeholder={`Topic ${index + 1}`}
                      className="flex-1 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    {courseData.syllabus.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField(index, "syllabus")}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* DYNAMIC PREREQUISITES SECTION */}
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
                {courseData.prerequisites.map((item, index) => (
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
                      placeholder="e.g. Basic knowledge of computer"
                      className="flex-1 border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    {courseData.prerequisites.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayField(index, "prerequisites")}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Thumbnail & Actions */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Course Thumbnail
              </label>
              <div className="w-full aspect-video rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden mb-4">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon size={40} className="text-gray-300" />
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
                className="inline-block w-full py-3 text-center bg-blue-50 text-blue-600 rounded-xl font-bold cursor-pointer hover:bg-blue-100 transition"
              >
                Choose Image
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
