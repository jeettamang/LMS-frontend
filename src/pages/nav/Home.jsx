import { useNavigate } from "react-router-dom";
import Service from "../../components/home_ui/Service";
import Courses from "../course/Courses";



export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="bg-slate-900 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Upgrade Your IT Skills Today
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Professional training, certifications, and career support.
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
            className="bg-white text-slate-900 hover:bg-gray-200 hover:cursor-pointer  px-6 py-3 rounded-lg font-semibold"
          >
            Contact Us
          </button>
        </div>
      </section>

      {/* SEARCH SECTION */}
      <section className="py-12 px-6 bg-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search courses..."
            className="flex-1 border rounded-lg px-4 py-3 outline-none"
          />
          <select className="border rounded-lg px-4 py-3">
            <option>All Categories</option>
            <option>Programming</option>
            <option>Design</option>
          </select>
          <select className="border rounded-lg px-4 py-3">
            <option>Skill Level</option>
            <option>Beginner</option>
            <option>Advanced</option>
          </select>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
            Search
          </button>
        </div>
      </section>

      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>

        <Service />
      </section>

      <section className="bg-blue-600 text-white py-16 px-6">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          <div>
            <h3 className="text-4xl font-bold">5000+</h3>
            <p className="mt-2">Students Trained</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">150+</h3>
            <p className="mt-2">Courses</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">90%</h3>
            <p className="mt-2">Placement Rate</p>
          </div>
        </div>
      </section>
      <h2 className="mt-4 text-center font-bold text-2xl">
        Choose cousrse that you want to learn
      </h2>
      <Courses />

      {/* TESTIMONIALS */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Students Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1, 2, 3].map((t) => (
            <div key={t} className="bg-white border rounded-xl p-6 shadow">
              <p className="text-gray-600 mb-4">
                “Great training center with supportive mentors and practical
                learning.”
              </p>
              <h4 className="font-semibold">Student Name</h4>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-8 text-center">
        <p>© 2026 IT Training Institute. All rights reserved.</p>
      </footer>
    </div>
  );
}
