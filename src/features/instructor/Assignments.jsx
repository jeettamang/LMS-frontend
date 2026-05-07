import React, { useEffect, useState } from "react";
import api from "../../utils/axios";
import { BookOpen, Calendar, Award, Plus } from "lucide-react"; // Optional: if you have lucide-react installed
import { useNavigate } from "react-router-dom";

const Assignments = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAssignment = async () => {
    try {
      const res = await api.get("/assignment/instructor/", {
        withCredentials: true,
      });
      setAssignments(res.data.assignments || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAssignment();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            My Assignments
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and track your student tasks
          </p>
        </div>
        <button
          onClick={() => navigate("/instructor/create-assignment")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium shadow-sm"
        >
          <Plus size={20} />
          Create New
        </button>
      </div>

      {/* Main Content */}
      {assignments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assign) => (
            <div
              key={assign._id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="p-5 flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <BookOpen size={20} />
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                    Active
                  </span>
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                  {assign.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {assign.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-500 text-sm gap-2">
                    <Calendar size={16} />
                    <span>
                      Due: {new Date(assign.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm gap-2">
                    <Award size={16} />
                    <span>
                      Total Marks: <strong>{assign.totalMarks}</strong>
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 border-t border-gray-100 flex gap-3">
                <button className="flex-1 text-sm font-semibold text-blue-600 hover:text-blue-800">
                  Edit
                </button>
                <button className="flex-1 text-sm font-semibold text-gray-600 hover:text-gray-800">
                  View Submissions
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <h3 className="text-xl font-medium text-gray-700">
            No assignments found
          </h3>
          <p className="text-gray-500">Click "Create New" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default Assignments;
