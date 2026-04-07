import React, { useEffect, useState } from "react";
import { Users, Mail, BookOpen, Calendar, Phone, MapPin } from "lucide-react";
import api from "../../utils/axios";

const Students = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await api.get("/instructor/my-students", {
          withCredentials: true,
        });
        setEnrollments(data.students || []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading)
    return <div className="p-10 text-center font-bold">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">My Students</h1>
        <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-bold">
          {enrollments.length} Paid Enrollments
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {enrollments.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl text-center border border-dashed">
            <Users className="mx-auto text-gray-300 mb-2" />
            <p className="text-gray-500">No students found for your courses.</p>
          </div>
        ) : (
          enrollments.map((item) => (
            <div
              key={item._id}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                  {item.user?.name?.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{item.user?.name}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Mail size={14} /> {item.user?.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone size={14} /> {item.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {item.address}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:items-end border-t md:border-t-0 pt-3 md:pt-0">
                <div className="flex items-center gap-2 text-blue-600 font-semibold mb-1">
                  <BookOpen size={16} />
                  {item.course?.title}
                </div>
                <div className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar size={14} />
                  Joined: {new Date(item.createdAt).toLocaleDateString()}
                </div>
                <div className="mt-2 text-sm font-bold text-gray-700">
                  Rs. {item.amount} via {item.payment_method.toUpperCase()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Students;
