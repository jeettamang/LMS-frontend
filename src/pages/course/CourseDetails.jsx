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
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCourse();
  }, []);

  const getYouTubeID = (url) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  if (!course) return <div className="text-center mt-10">Loading...</div>;

  const videoId = getYouTubeID(course.videoUrl);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
            {course.title}
          </h1>

          {/* Video */}
          <div className="w-full bg-black rounded-xl overflow-hidden shadow-lg aspect-video">
            {videoId ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Course Preview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="flex items-center justify-center h-full text-white">
                <p>No preview video available</p>
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-3">About this Course</h2>
            <p className="text-gray-600 leading-relaxed">
              {course.description}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100">
            <h2 className="text-xl font-semibold mb-3">Prerequisites</h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Laptop / PC</li>
              <li>Stable Internet Connection</li>
              <li>Basic understanding of the subject</li>
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE: Enrollment Card */}
        <div className="h-fit sticky top-36">
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-6">
              <div className="text-2xl font-bold text-green-600 mb-4">
                Rs. {course.price}
              </div>

              <div className="space-y-3 text-sm text-gray-600 mb-6">
                <p className="flex items-center gap-2">
                  ⏳ <b>Duration:</b> {course.duration}
                </p>
                <p className="flex items-center gap-2">
                  👨‍🏫 <b>Instructor:</b> {course.instructor?.name}
                </p>
                <p className="flex items-center gap-2">
                  ⭐ <b>Rating:</b> {course.rating} / 5
                </p>
              </div>

              <button
                onClick={() =>
                  navigate(`/enroll/${course._id}`, { state: course })
                }
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition shadow-md"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* INSTRUCTOR SECTION */}
      <div className="max-w-7xl mx-auto mt-12 p-4 md:p-6">
        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-center md:items-start">
          <img
            className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-2xl shadow-md"
            src={course?.instructor?.profileImage || "https://placehold.co/400"}
            alt={course?.instructor?.name}
          />

          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Meet your Instructor: {course?.instructor?.name}
            </h3>
            <div className="space-y-4 text-gray-700">
              <p>
                <span className="font-bold text-gray-900">Specialization:</span>{" "}
                {course?.instructor?.bio}
              </p>
              <p>
                <span className="font-bold text-gray-900">Bio:</span>{" "}
                {course?.instructor?.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
