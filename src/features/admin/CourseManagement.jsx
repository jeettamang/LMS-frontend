import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "react-toastify";
import api from "../../utils/axios";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getCourses = async () => {
    try {
      setLoading(true);
      const res = await api.get("/course/get-all");
      setCourses(res.data.course || []);
      console.log(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?",
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/course/delete/${id}`, {
        withCredentials: true,
      });

      toast.success("Course deleted successfully");
      getCourses();
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to delete course");
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Course Management</h1>
        <button
          onClick={() => navigate("/admin/create-course")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Course
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">SN</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Duration</th>
              <th className="p-3 text-left">Instructor</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center p-6 text-blue-500 font-semibold"
                >
                  Loading...
                </td>
              </tr>
            ) : courses.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-500">
                  No courses found. Click "Add Course" to create one.
                </td>
              </tr>
            ) : (
              courses.map((course, index) => (
                <tr
                  key={course._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-12 h-12 object-cover rounded shadow-sm"
                    />
                  </td>
                  <td className="p-3 font-medium">{course.title}</td>
                  <td className="p-3 text-green-600 font-bold">
                    Rs. {course.price}
                  </td>
                  <td className="p-3">{course.duration}</td>
                  <td className="p-3">{course.instructor?.name || "N/A"}</td>
                  <td className="p-3">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() =>
                          navigate(`/admin/edit-course/${course._id}`, {
                            state: { course },
                          })
                        }
                        className="text-blue-600 hover:text-blue-800 transition"
                        title="Edit Course"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => deleteCourse(course._id)}
                        className="text-red-600 hover:text-red-800 transition"
                        title="Delete Course"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseManagement;
