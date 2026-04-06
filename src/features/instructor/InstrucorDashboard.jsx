import React, { useContext } from "react";
import { BookOpen, Users, PlusCircle, TrendingUp } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const InstrucorDashboard = () => {
  const { state } = useContext(AuthContext);
  const { userInfo } = state;

  const stats = [
    {
      label: "Total Courses",
      value: "12",
      icon: <BookOpen className="text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      label: "Active Students",
      value: "156",
      icon: <Users className="text-green-600" />,
      bg: "bg-green-50",
    },
    {
      label: "Course Enrollments",
      value: "432",
      icon: <TrendingUp className="text-purple-600" />,
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, {userInfo?.name}!
        </h1>
        <p className="text-gray-500 mt-1">
          Here is what's happening with your courses today.
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
          <div className="text-center py-10">
            <Users className="mx-auto text-gray-300 mb-3" size={40} />
            <p className="text-gray-400">
              No new enrollments in the last 24 hours.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-center items-center text-center">
          <PlusCircle className="text-blue-500 mb-3" size={48} />
          <h3 className="font-bold text-gray-800">
            Ready to teach something new?
          </h3>
          <p className="text-gray-500 mb-6 text-sm px-4">
            Create a new course and start sharing your knowledge with students.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            Create New Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstrucorDashboard;
