import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../utils/axios";

const useCreateCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [preview, setPreview] = useState(null);

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    instructor: "",
    category: "", 
    image: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [instRes, catRes] = await Promise.all([
          api.get("/instructor/get-all"),
          api.get("/course-category/get-all"), // Your specific category route
        ]);
        setInstructors(
          instRes.data.instructors || instRes.data.instructor || [],
        );
        setCategories(catRes.data.categories || []);
      } catch (error) {
        toast.error("Failed to load required lists (Instructors/Categories)");
      }
    };
    fetchData();
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
    if (!courseData.image) return toast.warning("Please upload a course image");
    if (!courseData.category) return toast.warning("Please select a category");

    setLoading(true);
    try {
      const data = new FormData();
      data.append("title", courseData.title);
      data.append("description", courseData.description);
      data.append("price", courseData.price);
      data.append("duration", courseData.duration);
      data.append("instructor", courseData.instructor);
      data.append("category", courseData.category); // Appending category
      data.append("image", courseData.image);

      const response = await api.post("/course/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(response.data.message || "Course created successfully!");
      navigate("/admin/course-management");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    preview,
    instructors,
    categories, 
    handleChange,
    handleFileChange,
    handleSubmit,
    courseData,
  };
};

export default useCreateCourse;
