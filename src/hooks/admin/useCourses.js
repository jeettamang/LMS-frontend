import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../utils/axios";

const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCourses = async () => {
    try {
      setLoading(true);
      const res = await api.get("/course/get-all");
      setCourses(res.data.course || []);
      console.log(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?",
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/course/delete/${id}`, {
        withCredentials: true,
      });

      toast.success("Course deleted successfully");
      getCourses();
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to delete course");
    }
  };

  useEffect(() => {
    getCourses();
  }, []);
  return {
    courses,
    loading,
    deleteCourse,
  };
};

export default useCourses;
