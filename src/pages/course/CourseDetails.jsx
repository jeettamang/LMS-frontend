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
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
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

          {/*SYLLABUS */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
               🎓 Course Syllabus
            </h2>
            <div className="space-y-3">
              {course.syllabus && course.syllabus.length > 0 ? (
                course.syllabus.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-orange-50 transition-colors group">
                    <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 group-hover:bg-orange-500 group-hover:text-white">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 font-medium">{item}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">No syllabus topics listed.</p>
              )}
            </div>
          </div>

          {/* DYNAMIC PREREQUISITES SECTION */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-800">
               📋 Prerequisites
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {course.prerequisites && course.prerequisites.length > 0 ? (
                course.prerequisites.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700 bg-gray-50 p-2 rounded-md border-l-4 border-blue-500">
                    <span className="text-blue-500">✔</span> {item}
                  </li>
                ))
              ) : (
                <p className="text-gray-500 italic">No specific prerequisites required.</p>
              )}
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
                onClick={() => navigate(`/enroll/${course._id}`, { state: course })}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition shadow-md"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* INSTRUCTOR SECTION */}
      <div className="max-w-7xl mx-auto mt-12 p-4 md:p-6 mb-10">
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
                {course?.instructor?.specialization}
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