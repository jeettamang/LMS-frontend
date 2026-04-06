import React, { useEffect, useState } from "react";
import { UserPlus, Pencil, Trash2, Mail } from "lucide-react";
import { toast } from "react-toastify";
import api from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const InstructorManagement = () => {
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInstructors = async () => {
    try {
      setLoading(true);
      const res = await api.get("/instructor/get-all");
      setInstructors(res.data.instructors || []);
    } catch (error) {
      toast.error("Failed to fetch instructors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure? This may affect assigned courses.")) {
      try {
        await api.delete(`/instructor/delete/${id}`);
        toast.success("Instructor removed");
        fetchInstructors();
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Instructor Management
          </h1>
          <p className="text-sm text-gray-500">Manage your teaching staff.</p>
        </div>
        <button
          onClick={() => navigate("/admin/create-instructor")}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:cursor-pointer hover:bg-blue-700 transition shadow-md shadow-blue-100"
        >
          <UserPlus size={18} />
          Add Instructor
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm font-semibold">
              <th className="p-4">Instructor</th>
              <th className="p-4">Email</th>
              <th className="p-4">Specialization</th>
              <th className="p-4">Assigned Courses</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan="5" className="p-10 text-center text-blue-500">
                  Loading staff...
                </td>
              </tr>
            ) : instructors.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-10 text-center text-gray-400">
                  No instructors found.
                </td>
              </tr>
            ) : (
              instructors.map((inst) => (
                <tr key={inst._id} className="hover:bg-gray-50/50 transition">
                  {/* Instructor Info Column */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        className="w-10 h-10 rounded-full object-cover"
                        src={inst.profileImage}
                        alt={inst?.name}
                      />
                      <span className="font-medium text-gray-700">
                        {inst.name}
                      </span>
                    </div>
                  </td>

                  {/* Email Column */}
                  <td className="p-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Mail size={14} /> {inst.email}
                    </div>
                  </td>

                  {/* FIXED: Specialization Column */}
                  <td className="p-4">
                    <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-semibold">
                      {inst.specialization || "General"}
                    </span>
                  </td>

                  {/* FIXED: Assigned Courses Column */}
                  <td className="p-4 text-center">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                      {inst.coursesCount || 0}{" "}
                      {inst.coursesCount === 1 ? "Course" : "Courses"}
                    </span>
                  </td>

                  {/* Actions Column */}
                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() =>
                          navigate(`/admin/edit-instructor/${inst._id}`, {
                            state: { inst },
                          })
                        }
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(inst._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstructorManagement;
