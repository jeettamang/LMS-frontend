import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../utils/axios";

const useEditCourse = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [preview, setPreview] = useState(state?.course?.image || null);

  const [formData, setFormData] = useState({
    title: state?.course?.title || "",
    instructor: state?.course?.instructor?._id || "",
    price: state?.course?.price || "",
    duration: state?.course?.duration || "",
    description: state?.course?.description || "",
    videoUrl: state?.course?.videoUrl || "",
    image: null,

    syllabus:
      state?.course?.syllabus?.length > 0 ? state.course.syllabus : [""],
    prerequisites:
      state?.course?.prerequisites?.length > 0
        ? state.course.prerequisites
        : [""],
  });

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await api.get("/instructor/get-all");
        setInstructors(res.data.instructors || res.data.instructor || []);
      } catch (error) {
        toast.error("Could not load instructor list");
      }
    };
    fetchInstructors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index, value, field) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const addArrayField = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayField = (index, field) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("instructor", formData.instructor);
      data.append("price", formData.price);
      data.append("duration", formData.duration);
      data.append("description", formData.description);
      data.append("videoUrl", formData.videoUrl);

      // Stringify filtered arrays (removes empty strings)
      data.append(
        "syllabus",
        JSON.stringify(formData.syllabus.filter((s) => s.trim() !== "")),
      );
      data.append(
        "prerequisites",
        JSON.stringify(formData.prerequisites.filter((p) => p.trim() !== "")),
      );

      if (formData.image) {
        data.append("image", formData.image);
      }

      const response = await api.put(`/course/edit/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success(response.data.message || "Course updated successfully!");
      navigate("/admin/course-management");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    instructors,
    preview,
    handleChange,
    handleArrayChange,
    addArrayField,
    removeArrayField,
    handleImageChange,
    handleUpdate,
  };
};

export default useEditCourse;
