import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios"; // Your axios instance withCredentials: true
import Service from "../../components/home_ui/Service";
import Courses from "../course/Courses";

export default function Home() {
  const navigate = useNavigate();

  // State for Search and Filters
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "All Categories",
    level: "Skill Level",
  });

  // 1. Fetch real categories from your MongoDB
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/course-category/get"); // Update to your category route
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // 2. Handle Search Action
  const handleSearch = () => {
    // Construct the query string for your updated getCourses controller
    const queryParams = new URLSearchParams();
    if (filters.search) queryParams.append("search", filters.search);
    if (filters.category !== "All Categories")
      queryParams.append("category", filters.category);

    // Navigate to courses page with the filters in the URL
    navigate(`/courses?${queryParams.toString()}`);
  };

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="bg-slate-900 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Upgrade Your IT Skills Today
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Professional training, certifications, and career support in
          Kathmandu.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/courses")}
            className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer px-6 py-3 rounded-lg font-semibold"
          >
            Explore Courses
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="bg-white text-slate-900 hover:bg-gray-200 hover:cursor-pointer px-6 py-3 rounded-lg font-semibold"
          >
            Contact Us
          </button>
        </div>
      </section>

      {/* SEARCH SECTION - Now Dynamic */}
      <section className="py-12 px-6 bg-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search courses..."
            className="flex-1 border rounded-lg px-4 py-3 outline-none"
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

          <select
            className="border rounded-lg px-4 py-3"
            value={filters.level}
            onChange={(e) => setFilters({ ...filters, level: e.target.value })}
          >
            <option>Skill Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Advanced">Advanced</option>
          </select>

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </section>

      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <Service />
      </section>

      {/* Dynamic Courses List */}
      <h2 className="mt-4 text-center font-bold text-2xl">
        Choose the course you want to learn
      </h2>
      <Courses />

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-8 text-center">
        <p>© 2026 IT Training Institute. All rights reserved.</p>
      </footer>
    </div>
  );
}
