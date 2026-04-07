import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import api from "../../utils/axios";

const useInstructorCreateCourse = () => {
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
    instructor: userInfo?.id || userInfo?._id || "",
    image: null,
  });

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
  return {
    loading,
    preview,
    handleChange,
    handleFileChange,
    handleSubmit,
  };
};

export default useInstructorCreateCourse;
