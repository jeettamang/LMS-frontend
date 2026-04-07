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
    image: null,
  });

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await api.get("/instructor/get-all");
        setInstructors(res.data.instructors || res.data.instructor || []);
      } catch (error) {
        console.error("Failed to load instructors", error);
        toast.error("Could not load instructor list");
      }
    };
    fetchInstructors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  // 4. Submit Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("instructor", formData.instructor); // Sending the Hex ID
      data.append("price", formData.price);
      data.append("duration", formData.duration);
      data.append("description", formData.description);

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
      console.error("Update failed:", error.response?.data);
      toast.error(
        error.response?.data?.message || "Update failed (Server Error 500)",
      );
    } finally {
      setLoading(false);
    }
  };
  if (!state?.course) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <p>No course data found. Please return to management.</p>
        <button
          onClick={() => navigate("/admin/course-management")}
          className="text-blue-600 underline mt-2"
        >
          Go Back
        </button>
      </div>
    );
  }
  return {
    formData,
    loading,
    instructors,
    preview,
    handleChange,
    handleImageChange,
    handleUpdate,
  };
};

export default useEditCourse;
