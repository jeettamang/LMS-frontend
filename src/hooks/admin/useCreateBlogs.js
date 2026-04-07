import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import api from "../../utils/axios";
import { AuthContext } from "../../context/AuthContext";

const useCreateBlogs = () => {
  const { state } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);

    if (state?.userInfo?.id) {
      data.append("author", state.userInfo.id);
      data.append("role", state.userInfo.role || "admin");
    } else {
      toast.error("User session not found. Please log in again.");
      setLoading(false);
      return;
    }

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      await api.post("/blogs/create", data);
      toast.success("Blog published successfully!");
      navigate("/admin/blogs");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };
  return {
    formData,
    preview,
    loading,
    handleChange,
    handleFileChange,
    handleSubmit,
  };
};

export default useCreateBlogs;
