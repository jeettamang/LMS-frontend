import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import api from "../../utils/axios";
import {
  BookOpen,
  Users,
  UserCheck,
  Wallet,
  ArrowRight,
  ListOrdered,
} from "lucide-react";
import DashboardCard from "../../components/cards/UserDashboardCard";

const AdminDashboard = () => {
  const [data, setData] = useState({
    courses: 0,
    students: 0,
    instructors: 0,
    totalEarnings: 0,
    recentSales: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [coursesRes, usersRes, instructorsRes, earningsRes, enrollsRes] =
        await Promise.all([
          api.get("/course/get-all"),
          api.get("/users/get-all"),
          api.get("/instructor/get-all"),
          api.get("/enrollment/total-earnings"),
          api.get("/enrollment/get-enrolls?limit=5"), 
        ]);

      setData({
        courses: coursesRes.data.course?.length || 0,
        students: usersRes.data.users?.length || 0,
        instructors: instructorsRes.data.instructors?.length || 0,
        totalEarnings: earningsRes.data.totalEarnings || 0,
        recentSales: enrollsRes.data.enrollments || [],
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading)
    return <div className="p-10 text-center font-bold">Loading...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-black text-gray-800 mb-8 tracking-tight">
        Admin Overview
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <DashboardCard
          title="Total Revenue"
          value={`Rs. ${data.totalEarnings.toLocaleString()}`}
          icon={<Wallet className="text-green-600" />}
          bgColor="bg-green-50"
        />
        <DashboardCard
          title="Total Courses"
          value={data.courses}
          icon={<BookOpen className="text-blue-600" />}
          bgColor="bg-blue-50"
        />
        <DashboardCard
          title="Total Students"
          value={data.students}
          icon={<Users className="text-purple-600" />}
          bgColor="bg-purple-50"
        />
        <DashboardCard
          title="Instructors"
          value={data.instructors}
          icon={<UserCheck className="text-orange-600" />}
          bgColor="bg-orange-50"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <ListOrdered size={20} className="text-gray-400" /> Recent Sales
          </h2>
          <Link
            to="/admin/all-enrollments"
            className="text-sm font-bold text-blue-600 flex items-center gap-1 hover:underline"
          >
            See All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-black">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.recentSales.map((sale) => (
                <tr key={sale._id} className="text-sm hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-700">
                    {sale.user?.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {sale.course?.title}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    Rs. {sale.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                      {sale.status}
                    </span>
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

export default AdminDashboard;
