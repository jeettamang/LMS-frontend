import { useEffect, useState } from "react";
import { IoPeopleOutline } from "react-icons/io5";
import { FaHandshakeAngle, FaCrown } from "react-icons/fa6";
import { Loader2 } from "lucide-react";
import api from "../../utils/axios";

const About = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInst = async () => {
      try {
        const res = await api.get("/instructor/public");
        setInstructors(res.data.publicInstructors);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInst();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-blue-50 to-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-6">
            Our Story
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Empowering the next generation of IT professionals in Nepal through
            practical learning and industry-leading mentorship.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-pink-500 pl-4">
            Background
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Sipalaya empowers professionals and students in the tech industry
            with tailored, top-notch training programs. Our expert instructors,
            with extensive industry experience, provide personalized support.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-all transform hover:-translate-y-1">
            Let's Connect
          </button>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-blue-100 rounded-2xl -z-10 transform rotate-3"></div>
          <img
            className="w-full rounded-2xl shadow-2xl object-cover h-[400px]"
            src="https://broadwayinfosys.com/uploads/banner/1751542485_60565.jpg"
            alt="Sipalaya Training"
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
              Our Mission
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Creating a digital tomorrow by empowering people with competent
              skills and turning them into able IT professionals.
            </p>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">
              Our Vision
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Emerging as the premier IT education center by generating a
              talented professional workforce for technological advancement.
            </p>
          </div>
        </div>
      </section>
      <section className="py-24 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">
          The People Behind the Mission
        </h2>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {instructors.map((ins) => (
              <div
                key={ins._id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={ins.profileImage || "https://via.placeholder.com/300"}
                    alt={ins.name}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {ins.name}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {ins.specialization || "Industry Expert & Mentor"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-gray-900 text-white py-24 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold">Our Core Values</h2>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          {[
            {
              icon: <IoPeopleOutline size={40} />,
              title: "People",
              desc: "Focus on one-on-one commitment through career guidance.",
            },
            {
              icon: <FaCrown size={40} />,
              title: "Leadership",
              desc: "Empowering critical thinking and solution-focused future leaders.",
            },
            {
              icon: <FaHandshakeAngle size={40} />,
              title: "Trust",
              desc: "High standards and integrity are the benchmarks for our trust.",
            },
          ].map((val, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="p-4 bg-blue-600/20 text-blue-400 rounded-full">
                {val.icon}
              </div>
              <h3 className="text-xl font-bold">{val.title}</h3>
              <p className="text-gray-400 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
        <h2 className="text-center text-gray-500 font-medium mb-12 uppercase tracking-widest">
          Trusted by Industry Leaders
        </h2>
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 items-center">
          <img
            className="h-8"
            src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
            alt="Microsoft"
          />
          <img
            className="h-8"
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg"
            alt="Cisco"
          />
          <img
            className="h-8"
            src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
            alt="Google"
          />
          <img
            className="h-8"
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            alt="AWS"
          />
        </div>
      </section>
    </div>
  );
};

export default About;
