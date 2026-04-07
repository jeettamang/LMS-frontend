import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../utils/axios";

const useCreateCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [preview, setPreview] = useState(null);

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    instructor: "",
    image: null,
  });

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await api.get("/instructor/get-all");
        setInstructors(res.data.instructors || res.data.instructor || []);
      } catch (error) {
        toast.error("Failed to load instructors list");
      }
    };
    fetchInstructors();
  }, []);

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
      console.log(response.data);
      toast.success(response.data.message || "Course created successfully!");
      navigate("/admin/course-management");
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
    instructors,
    handleChange,
    handleFileChange,
    handleSubmit,
    courseData,
  };
};

export default useCreateCourse;
