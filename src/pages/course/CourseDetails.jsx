import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/axios";

const CourseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  const fetchCourse = async () => {
    try {
      const res = await api.get(`/course/get/${id}`);
      setCourse(res.data.courseDetail);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  if (!course) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div>
      <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>

          <p className="text-gray-600 mb-6">{course.description}</p>

          <h2 className="text-xl font-semibold mt-8 mb-3">Prerequisites</h2>

          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>Laptop</li>
            <li>Internet</li>
          </ul>
        </div>

        {/* RIGHT SIDE CARD */}
        <div className="shadow-lg rounded-xl overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-52 object-cover"
          />

          <div className="p-4">
            <h2 className="text-lg font-semibold mb-3">{course.title}</h2>

            <div className="text-sm text-gray-600 space-y-2">
              <div>
                <p>📅 Starts: March 24, 2026</p>

                <p>⏳ Duration: {course.duration}</p>

                <p>👨‍🏫 Instructor: {course.instructor?.name}</p>

                <p>⭐ Rating: {course.rating}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-2xl font-bold text-green-600">
                Rs. {course.price}
              </p>

              <button
                onClick={() =>
                  navigate(`/enroll/${course._id}`, { state: course })
                }
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md hover:cursor-pointer"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="md:max-w-7xl mx-auto mt-10 p-6 bg-gray-200">
        <div className="flex flex-col md:flex-row gap-6 rounded-lg p-6">
          <img
            className="md:w-80 md:h-96 object-cover rounded"
            src={course?.instructor?.profileImage}
            alt={course?.instructor?.name}
          />

          <div className="bg-white rounded-2xl font-serif  md:p-12">
            <h3 className="md:text-2xl font-semibold mb-2 underline">
              Instructor: {course?.instructor?.name}
            </h3>

            <p className="text-gray-900 text-sm mb-2 md:text-xl">
              <span className="font-semibold">Bio:</span>{" "}
              {course?.instructor?.bio}
            </p>

            <p className="text-gray-900 md:text-xl">
              <span className="font-semibold">Experience:</span>{" "}
              {course?.instructor?.experience}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
