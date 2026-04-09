import { useState, useEffect } from "react";
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
    videoUrl: "",
    image: null,
    syllabus: [""], // Dynamic array for outlines
    prerequisites: [""] // Dynamic array for requirements
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [instRes, catRes] = await Promise.all([
          api.get("/instructor/get-all"),
          api.get("/course-category/get-all"),
        ]);
        setInstructors(instRes.data.instructors || instRes.data.instructor || []);
        setCategories(catRes.data.categories || []);
      } catch (error) {
        toast.error("Failed to load required lists");
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  // Helper to update specific index in an array
  const handleArrayChange = (index, value, field) => {
    const newArray = [...courseData[field]];
    newArray[index] = value;
    setCourseData((prev) => ({ ...prev, [field]: newArray }));
  };

  const addArrayField = (field) => {
    setCourseData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayField = (index, field) => {
    const newArray = courseData[field].filter((_, i) => i !== index);
    setCourseData((prev) => ({ ...prev, [field]: newArray }));
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
      
      // Append standard fields
      data.append("title", courseData.title);
      data.append("description", courseData.description);
      data.append("price", courseData.price);
      data.append("duration", courseData.duration);
      data.append("instructor", courseData.instructor);
      data.append("category", courseData.category);
      data.append("videoUrl", courseData.videoUrl);
      data.append("image", courseData.image);

      // Stringify arrays for the backend
      data.append("syllabus", JSON.stringify(courseData.syllabus.filter(s => s.trim() !== "")));
      data.append("prerequisites", JSON.stringify(courseData.prerequisites.filter(p => p.trim() !== "")));

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
    handleArrayChange,
    addArrayField,
    removeArrayField,
    handleFileChange,
    handleSubmit,
    courseData,
  };
};

export default useCreateCourse;