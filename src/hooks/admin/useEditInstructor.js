import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../../utils/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useEditInstructor = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const instructor = state?.inst;

  const [formData, setFormData] = useState({
    name: instructor?.name || "",
    email: instructor?.email || "",
    profileImage: instructor?.profileImage || "",
    specialization: instructor?.specialization || "",
    bio: instructor?.bio || "",
  });

  useEffect(() => {
    if (!instructor) {
      const fetchInstructor = async () => {
        try {
          const res = await api.get(`/instructor/get/${id}`);
          const data = res.data.instructor;
          setFormData({
            name: data.name,
            email: data.email,
            specialization: data.specialization || "",
            bio: data.bio || "",
          });
        } catch (error) {
          toast.error("Could not find instructor details");
          navigate("/admin/instructor-management");
        }
      };
      fetchInstructor();
    }
  }, [id, instructor, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.put(`/instructor/update/${id}`, formData);

      toast.success(response.data.message || "Profile updated successfully");
      navigate("/admin/instructor-management");
      console.log(response.data);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(
        error.response?.data?.message || "Failed to update instructor",
      );
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    formData,
    handleChange,
    handleUpdate,
  };
};

export default useEditInstructor;
