import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const fetchedCourses = async () => {
    try {
      const response = await api.get("/course/get-all");
      setCourses(response.data.course);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchedCourses();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-center">Courses</h1>

      {courses.length > 0 ? (
        <div className="flex flex-wrap gap-4 justify-center">
          {courses.map((course) => (
            <div
              key={course._id}
              className="shadow-md rounded-2xl p-3 md:w-72 hover:shadow-xl"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-60 md:h-40 rounded-t-2xl"
              />

              <h2 className="text-lg font-semibold mt-2">{course.title}</h2>

              <p className="text-sm mt-1">
                {course.description.substring(0, 80)}...
              </p>

              <p className="mt-2 font-bold">Rs. {course.price}</p>

              <button
                onClick={() => {
                  navigate(`/course-details/${course._id}`);
                }}
                className="mt-2 w-full hover:cursor-pointer bg-blue-500 hover:bg-blue-700 text-white md:px-4 rounded-md py-2"
              >
                View
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-4">Course not found</div>
      )}
    </div>
  );
};

export default Courses;
