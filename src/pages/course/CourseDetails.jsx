import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/axios";

const CourseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false); 

  const fetchCourse = async () => {
    try {
      const res = await api.get(`/course/get/${id}`);
      setCourse(res.data.courseDetail);
      setIsEnrolled(res.data.isEnrolled);
      console.log("Response Data:", res.data);
    } catch (error) {
      console.log("Error fetching course:", error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

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
        {/* LEFT SIDE - Info & Video */}
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
            {course.title}
          </h1>
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
        </div>

        {/* RIGHT SIDE - The Sidebar */}
        <div className="h-fit sticky top-36">
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              {/* 1. Hide price if isEnrolled is true */}
              {!isEnrolled && (
                <div className="text-2xl font-bold text-green-600 mb-4">
                  Rs. {course.price}
                </div>
              )}

              <div className="space-y-3 text-sm text-gray-600 mb-6">
                <p className="flex items-center gap-2">
                  ⏳ <b>Duration:</b> {course.duration}
                </p>
                <p className="flex items-center gap-2">
                  👨‍🏫 <b>Instructor:</b> {course.instructor?.name}
                </p>
              </div>

              {/* 2. Toggle button based on isEnrolled boolean */}
              {isEnrolled ? (
                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow-md"
                >
                  Continue Learning
                </button>
              ) : (
                <button
                  onClick={() =>
                    navigate(`/enroll/${course._id}`, { state: course })
                  }
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition shadow-md"
                >
                  Enroll Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
