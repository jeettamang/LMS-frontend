import React, { useEffect, useState } from "react";
import DashboardCard from "../../components/cards/UserDashboardCard";
import api from "../../utils/axios";
import {
  BookOpen,
  CheckCircle,
  Clock,
  Wallet,
  TrendingUp,
  Calendar,
} from "lucide-react";

const Dashboard = () => {
  const [data, setData] = useState({
    totalCourses: 0,
    paidCourses: 0,
    pendingPayments: 0,
    totalAmountPaid: 0,
    recentEnrollments: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/enrollment/user-dashboard");
      setData(res.data);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading)
    return (
      <div className="p-10 text-center font-medium">Loading Dashboard...</div>
    );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Student Overview
          </h1>
          <p className="text-gray-500">
            Track your learning progress and payments
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <DashboardCard
            title="Total Courses"
            value={data.totalCourses}
            icon={<BookOpen className="text-blue-600" />}
            bgColor="bg-blue-50"
          />
          <DashboardCard
            title="Active Learning"
            value={data.paidCourses}
            icon={<CheckCircle className="text-green-600" />}
            bgColor="bg-green-50"
          />
          <DashboardCard
            title="Pending Actions"
            value={data.pendingPayments}
            icon={<Clock className="text-amber-600" />}
            bgColor="bg-amber-50"
          />
          <DashboardCard
            title="Total Investment"
            value={`Rs. ${data.totalAmountPaid.toLocaleString()}`}
            icon={<TrendingUp className="text-purple-600" />}
            bgColor="bg-purple-50"
          />
        </div>

        {/* Recent Activity Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Calendar size={20} className="text-gray-400" />
              Recent Enrollments
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-bold">Course Name</th>
                  <th className="px-6 py-4 font-bold">Amount</th>
                  <th className="px-6 py-4 font-bold">Method</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {data.recentEnrollments.length > 0 ? (
                  data.recentEnrollments.map((enroll) => (
                    <tr
                      key={enroll._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-700">
                          {enroll.course?.title || "Unknown Course"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-medium">
                        Rs. {enroll.amount}
                      </td>
                      <td className="px-6 py-4">
                        <span className="uppercase text-[10px] bg-gray-100 px-2 py-1 rounded-md font-bold text-gray-500">
                          {enroll.payment_method}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                            enroll.status === "paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {enroll.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">
                        {new Date(enroll.createdAt).toLocaleDateString("en-GB")}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-10 text-center text-gray-400 italic"
                    >
                      No recent enrollments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
