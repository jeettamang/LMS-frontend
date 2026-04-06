import React, { useEffect, useState } from "react";
import { BookOpen, Edit, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../utils/axios";

const InstructorMyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        const { data } = await api.get("/instructor/my-courses", {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
          withCredentials: true,
        });

        setCourses(data.courses);
        console.log("Fetched Courses:", data.courses);
      } catch (error) {
        console.error(
          "Error fetching instructor courses:",
          error.response?.data || error.message,
        );
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 font-bold text-blue-600">
        Loading your courses...
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          My Published Courses
        </h1>
        <Link
          to="/instructor/create-course"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition shadow-sm"
        >
          <Plus size={18} /> Create New
        </Link>
      </div>

      {courses.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-dashed border-gray-300 text-center">
          <BookOpen className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-500 text-lg font-medium">
            You haven't created any courses yet.
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Courses you create as an instructor will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={
                    course.image ||
                    "https://via.placeholder.com/400x225?text=No+Thumbnail"
                  }
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-800 mb-2 truncate">
                  {course.title}
                </h3>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-blue-600 font-bold text-lg">
                    Rs. {course.price}
                  </span>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100">
                      <Edit size={18} />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InstructorMyCourses;
