import React, { useState, useEffect } from "react";
import api from "../../utils/axios";
import { X, Send } from "lucide-react";

const CreateAssignment = ({ onAssignmentCreated, closeModal }) => {
  const [courses, setCourses] = useState([]); // Store instructor's courses
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    courseId: "",
    dueDate: "",
    totalMarks: 100,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/instructor/my-courses", {
          withCredentials: true,
        });
        setCourses(res.data.courses || []);
      } catch (err) {
        console.error("Failed to load courses", err);
      }
    };
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.courseId) return setError("Please select a course");

    setLoading(true);
    setError("");

    try {
      const res = await api.post("/assignment/create", formData, {
        withCredentials: true,
      });

      if (res.data.success) {
        onAssignmentCreated();
        closeModal();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-8 bg-gray-50/50 min-h-screen">
      {/* Breadcrumbs / Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Create New Assignment
        </h1>
        <p className="text-slate-500 text-sm">
          Assign tasks to your enrolled students
        </p>
      </div>

      <div className="max-w-3xl bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Course Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Select Course
            </label>
            <select
              name="courseId"
              required
              value={formData.courseId}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-slate-600"
            >
              <option value="">Choose a Course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Assignment Title
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g., Final Project: E-commerce Site"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Instructions / Description
            </label>
            <textarea
              name="description"
              required
              rows="5"
              placeholder="Describe the requirements..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Grid for Date and Marks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Submission Deadline
              </label>
              <input
                type="datetime-local"
                name="dueDate"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Total Marks
              </label>
              <input
                type="number"
                name="totalMarks"
                min="0"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-200 flex justify-center items-center gap-2 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Publish Assignment"}
            </button>
            <button
              type="button"
              className="px-8 py-4 rounded-xl border border-slate-200 font-semibold text-slate-500 hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignment;
