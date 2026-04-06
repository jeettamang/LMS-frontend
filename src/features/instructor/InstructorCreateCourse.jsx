import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Save, Image as ImageIcon, ArrowLeft } from "lucide-react";
import api from "../../utils/axios";
import { AuthContext } from "../../context/AuthContext"; // Assuming you have this

const InstructorCreateCourse = () => {
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);
  const { userInfo } = state;
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    // We initialize this, but the backend will primarily use the token ID
    instructor: userInfo?.id || userInfo?._id || "",
    image: null,
  });

  // Ensure instructor ID is synced if userInfo loads late
  useEffect(() => {
    if (userInfo) {
      setCourseData((prev) => ({
        ...prev,
        instructor: userInfo.id || userInfo._id,
      }));
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourseData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseData.image) {
      return toast.warning("Please upload a course image");
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("title", courseData.title);
      data.append("description", courseData.description);
      data.append("price", courseData.price);
      data.append("duration", courseData.duration);

      // IMPORTANT: Even though backend uses req.user._id,
      // we send this to satisfy the instructorFromBody variable check.
      data.append("instructor", courseData.instructor);
      data.append("image", courseData.image);

      const response = await api.post("/course/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(response.data.message || "Course created successfully!");
      navigate("/instructor/my-courses");
    } catch (error) {
      console.error("Creation error:", error);
      toast.error(error.response?.data?.message || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-500 hover:text-gray-700 mb-4 transition"
        >
          <ArrowLeft size={18} className="mr-1" /> Back
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Create New Course
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Course Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={courseData.title}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                {/* Read-only instructor name so they know who they are posting as */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Instructor
                  </label>
                  <input
                    type="text"
                    value={userInfo?.name || ""}
                    disabled
                    className="w-full border border-gray-100 bg-gray-50 rounded-xl p-3 text-gray-400 cursor-not-allowed"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Price (Rs.)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={courseData.price}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={courseData.duration}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={courseData.description}
                    onChange={handleChange}
                    rows="5"
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <label className="block text-sm font-semibold text-gray-700 mb-4 text-left">
                Course Image
              </label>
              <div className="w-full aspect-video rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden mb-4">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400">
                    <ImageIcon size={40} className="mx-auto mb-2 opacity-50" />
                    <p className="text-xs">No image selected</p>
                  </div>
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
                className="inline-block w-full py-3 bg-blue-50 text-blue-600 rounded-xl font-bold cursor-pointer hover:bg-blue-100 transition"
              >
                Upload Image
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-lg disabled:bg-blue-300"
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

export default InstructorCreateCourse;
