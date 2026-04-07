import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../utils/axios";

const useCreateInstructor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    bio: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("specialization", formData.specialization);
      data.append("bio", formData.bio);
      if (formData.profileImage)
        data.append("profileImage", formData.profileImage);

      await api.post("/instructor/create", data);

      toast.success("Instructor created successfully!");
      navigate("/admin/instructor-management");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create instructor",
      );
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    imagePreview,
    formData,
    handleChange,
    handleImageChange,
    handleSubmit,
  };
};

export default useCreateInstructor;
