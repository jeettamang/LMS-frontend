import React, { useEffect, useState } from "react";
import api from "../../utils/axios";
import { ListOrdered, ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AllEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAll = async () => {
    try {
      // Calling the route WITHOUT ?limit to get everything
      const res = await api.get("/enrollment/get-enrolls");
      setEnrollments(res.data.enrollments || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  if (loading)
    return <div className="p-10 text-center font-bold">Loading Records...</div>;

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 font-bold transition-colors"
      >
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-black text-gray-800 tracking-tight">
              Full Enrollment History
            </h2>
            <p className="text-gray-500 text-sm">
              A complete record of all course purchases.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-black tracking-widest">
              <tr>
                <th className="px-8 py-5">Student Name</th>
                <th className="px-8 py-5">Course Title</th>
                <th className="px-8 py-5">Price</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Transaction Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {enrollments.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-8 py-5">
                    <p className="font-bold text-gray-800">{item.user?.name}</p>
                    <p className="text-[10px] text-gray-400">
                      {item.user?.email}
                    </p>
                  </td>
                  <td className="px-8 py-5 text-gray-600 font-medium">
                    {item.course?.title}
                  </td>
                  <td className="px-8 py-5 font-black text-gray-900">
                    Rs. {item.amount}
                  </td>
                  <td className="px-8 py-5">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-gray-500 text-sm">
                    {new Date(item.createdAt).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllEnrollments;
