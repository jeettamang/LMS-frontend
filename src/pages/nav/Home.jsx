import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";
import Service from "../../components/home_ui/Service";
import Courses from "../course/Courses";

export default function Home() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "All Categories",
    level: "Skill Level",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/course-category/get-all");
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSearch = () => {
    if (filters.category && filters.category !== "All Categories") {
      const element = document.getElementById(filters.category);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    const queryParams = new URLSearchParams();
    if (filters.search) queryParams.append("search", filters.search);
    if (filters.category !== "All Categories")
      queryParams.append("category", filters.category);

    navigate(`/courses?${queryParams.toString()}`);
  };

  return (
    <div className="w-full">
      <section className="bg-slate-900 text-white py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Master Key IT Skills
          </h1>
          <p className="text-lg md:text-2xl mb-4 text-blue-300">
            10% off for January batch!
          </p>
          <p className="text-md md:text-lg mb-10 text-gray-400">
            New Python Course Launched — Professional training and career
            support.
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            <button
              onClick={() => navigate("/contact")}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-bold transition-all"
            >
              Contact us
            </button>
            <button
              onClick={() => navigate("/courses")}
              className="bg-white text-slate-900 hover:bg-gray-200 px-8 py-3 rounded-lg font-bold transition-all"
            >
              View Courses
            </button>
          </div>
        </div>
      </section>

      {/* SEARCH SECTION */}
      <section className="py-12 px-6 bg-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search courses..."
            className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />

          <select
            className="border rounded-lg px-4 py-3"
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          >
            <option>All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
          >
            Search
          </button>
        </div>
      </section>

      {/* 2. HIGHLIGHT FEATURES / SERVICES (Updated from image) */}
      <section className="py-16 px-6 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-500 italic text-lg max-w-2xl mx-auto">
            "Over 5,000 students successfully trained and placed in top
            companies"
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-blue-50 p-6 rounded-xl text-center">
            <h3 className="text-3xl font-bold text-blue-600">5,000+</h3>
            <p className="text-gray-600 font-medium">Students Trained</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl text-center">
            <h3 className="text-3xl font-bold text-blue-600">Top Tier</h3>
            <p className="text-gray-600 font-medium">Placement Statistics</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl text-center">
            <h3 className="text-3xl font-bold text-blue-600">Cert Prep</h3>
            <p className="text-gray-600 font-medium">100% Focused</p>
          </div>
        </div>

        <Service />
      </section>

      <section className="bg-white py-12">
        <h2 className="text-center font-bold text-3xl mb-8">
          Choose the course you want to learn
        </h2>
        <Courses />
      </section>
    </div>
  );
}
