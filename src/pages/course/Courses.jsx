import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, catRes] = await Promise.all([
          api.get("/course/get-all"),
          api.get("/course-category/get-all"),
        ]);
        setCourses(courseRes.data.course);
        setCategories(catRes.data.categories);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Explore Our <span className="text-blue-600">Courses</span>
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Master new skills with our expert-led programs.
          </p>
        </header>

        {categories.map((cat) => {
          const sectionCourses = courses.filter(
            (course) => course.category?._id === cat._id,
          );

          if (sectionCourses.length === 0) return null;

          return (
            <section key={cat._id} id={cat._id} className="mb-20">
              {/* Refined Category Header */}
              <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-bold text-gray-800 capitalize">
                  {cat.name}
                </h2>
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {sectionCourses.length} Courses
                </span>
              </div>

              {/* Responsive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {sectionCourses.map((item) => (
                  <div
                    key={item._id}
                    className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={item.image}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        alt={item.title}
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                        {item.description ||
                          "Learn the fundamentals and advanced techniques in this comprehensive course."}
                      </p>

                      <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-400 uppercase font-semibold">
                            Price
                          </p>
                          <p className="text-lg font-bold text-gray-900">
                            Rs. {item.price}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            navigate(`/course-details/${item._id}`)
                          }
                          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all transform active:scale-95 shadow-md shadow-blue-200"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
