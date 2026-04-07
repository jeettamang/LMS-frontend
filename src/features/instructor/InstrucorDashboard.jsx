import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Users, PlusCircle, TrendingUp, Loader2 } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../utils/axios";

const InstrucorDashboard = () => {
  const { state } = useContext(AuthContext);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalEarnings: 0,
    recentActivity: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/instructor/my-dashboard");
        setDashboardData(data);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    {
      label: "Total Courses",
      value: dashboardData.totalCourses,
      icon: <BookOpen className="text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      label: "Active Students",
      value: dashboardData.totalStudents,
      icon: <Users className="text-green-600" />,
      bg: "bg-green-50",
    },
    {
      label: "Total Revenue",
      value: `Rs. ${dashboardData.totalEarnings}`,
      icon: <TrendingUp className="text-purple-600" />,
      bg: "bg-purple-50",
    },
  ];

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, {userInfo?.name}!
        </h1>
        <p className="text-gray-500 mt-1">
          Monitor your course performance and student engagement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4"
          >
            <div className={`p-4 rounded-xl ${stat.bg}`}>{stat.icon}</div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Recent Enrollments</h3>
          {dashboardData.recentActivity.length > 0 ? (
            <div className="space-y-4">
              {dashboardData.recentActivity.map((enrol) => (
                <div
                  key={enrol._id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-sm">{enrol.user?.name}</p>
                    <p className="text-xs text-gray-500">
                      {enrol.course?.title}
                    </p>
                  </div>
                  <span className="text-xs text-blue-600 font-bold">
                    {new Date(enrol.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <Users className="mx-auto text-gray-300 mb-3" size={40} />
              <p className="text-gray-400">No new enrollments found.</p>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-center items-center text-center">
          <PlusCircle className="text-blue-500 mb-3" size={48} />
          <h3 className="font-bold text-gray-800">New Course</h3>
          <p className="text-gray-500 mb-6 text-sm px-4">
            Create a new course and start sharing your knowledge.
          </p>
          <button
            onClick={() => navigate("/instructor/create-course")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Create New Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstrucorDashboard;
