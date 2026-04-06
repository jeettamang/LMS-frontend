import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";

const MyCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/users/my-courses", {
        withCredentials: true,
      });

      setCourses(res.data.data);
      console.log(res.data);
    } catch (error) {
      console.log("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((item) => (
          <div key={item._id} className="bg-white shadow rounded-xl p-4">
            <img src={item.course.image} alt={item.course.title} />
            <h2 className="text-lg font-semibold">{item.course.title}</h2>

            <p className="text-gray-600">Duration: {item.course.duration}</p>

            <p className="text-gray-600">Price: Rs. {item.course.price}</p>

            <p
              className={`mt-2 font-medium ${
                item.status === "paid" ? "text-green-600" : "text-red-600"
              }`}
            >
              Status: {item.status}
            </p>

            {item.status === "pending" && (
              <button
                onClick={() => navigate(`/enroll/${item.course._id}`)}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Pay Now
              </button>
            )}

            {item.status === "paid" && (
              <button
                onClick={() => navigate(`/course-details/${item.course._id}`)}
                className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
              >
                Continue Course
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
