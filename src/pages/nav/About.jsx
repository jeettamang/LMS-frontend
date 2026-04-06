import { useEffect, useState } from "react";
import { IoPeopleOutline } from "react-icons/io5";
import { FaHandshakeAngle } from "react-icons/fa6";
import { FaCrown } from "react-icons/fa6";
import api from "../../utils/axios";


const About = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchInst = async () => {
      const res = await api.get("/instructor/get-all");
      setInstructors(res.data.instructors);
      console.log(res.data.instructors);
    };
    fetchInst();
  }, []);
  return (
    <div>
      <div className="p-16 md:p-12 md:max-w-6xl ">
        <h1 className="text-[#0000ff] text-3xl font-bold text-center">
          Our Story
        </h1>
        <p className="text-[#0037ff] text-md mt-2 text-center">
          Make learning and teaching more effective with active <br />{" "}
          participation and student collaboration
        </p>
      </div>
      <div className="md:flex justify-around p-4">
        <div className="p-2">
          <h2 className="text-[#ff00ff] font-semibold text-2xl">Background</h2>
          <p className="p-4 text-left text-2xl max-w-4xl">
            Sipalaya empowers professionals and students in the tech industry
            with tailored, top-notch training programs. Our expert instructors,
            with extensive industry experience, provide personalized support.
            Offering interactive, hands-on courses covering the latest
            technologies, we’ve helped countless individuals elevate their
            careers. Join us to achieve your goals confidently.
          </p>
          <div className="text-center mt-2.5">
            <button className="w-52 p-2 rounded-2xl cursor-pointer bg-blue-500 hover:bg-blue-700 text-white">
              Let's connect
            </button>
          </div>
        </div>
        <div className="max-w-3xl">
          <img
            className="w-full rounded-xl"
            src="https://broadwayinfosys.com/uploads/banner/1751542485_60565.jpg"
            alt="Sipalaya"
          />
        </div>
      </div>

      <div className="md:flex gap-4 p-4 font-serif mt-12">
        <div className="bg-[#edf3fa] text-[#151a21] p-10 rounded-2xl">
          <h3 className="text-xl font-semibold  text-[#006af5] ">
            Our Mission
          </h3>
          <p className="text-2xl text-left">
            We are creating a digital tomorrow by empowering people with
            competent skills & turning them into able IT professionals who can
            contribute & transform society as a whole.
          </p>
        </div>
        <div className="bg-[#edf3fa] text-[#151a21] p-10 rounded-2xl">
          <h3 className="text-xl font-semibold text-[#006af5]">Our Vision</h3>
          <p className="text-2xl text-left">
            We are emerging as the premier IT education center beyond our
            boundaries by generating a talented professional workforce for
            overall technological advancement.
          </p>
        </div>
      </div>
      <h1 className="text-2xl text-center font-bold border-b mt-4 text-[#ff00ff] font-serif">
        The people behind the mission
      </h1>
      <div className="bg-gray-100 p-12 mt-2 grid md:grid-cols-4 gap-6">
        {instructors?.length > 0 ? (
          instructors.map((ins) => (
            <div key={ins._id} className="bg-white p-4 rounded-xl shadow w-72">
              <img
                className="rounded-2xl w-full"
                src={ins.profileImage}
                alt={ins.name}
              />

              <div className="text-center mt-2">
                <h2 className="text-xl font-semibold text-[#ed0202]">
                  {ins.name}
                </h2>
                <p>{ins.bio}</p>
              </div>
            </div>
          ))
        ) : (
          <div>Instructor not found</div>
        )}
      </div>
      <h1 className="bg-gray-200 text-center text-2xl font-bold pt-6 p-4 font-serif">Our Core Value</h1>
      <div className="flex flex-col md:flex-row justify-center gap-6 bg-gray-200 p-8">
        <div className="bg-white shadow-gray-3xl rounded-xl py-12 px-8 max-w-sm">
          <h2 className="text-2xl font-bold mb-2">
            <IoPeopleOutline size={30} /> People
          </h2>
          <p className="text-xl text-left">
            We strive and focus on one on one commitment through our intense
            counselling, career guidances & support ensuring the individual
            potential transforms into a tomorrow’s professional able to lead &
            shine.
          </p>
        </div>

        <div className="bg-white shadow-gray-3xl rounded-xl py-12 px-8 max-w-sm">
          <h2 className="text-2xl font-bold mb-2">
            <FaCrown size={30} /> Leadership
          </h2>
          <p className="text-xl text-left">
            We go beyond technical training to develop competent professionals
            having headship expertise required for project management, decision
            making, and strategic ingenuity. We empower critical thinking,
            emotional intelligence, and solution-focused future leaders.
          </p>
        </div>

        <div className="bg-white shadow-gray-3xl rounded-xl py-12 px-8 max-w-sm">
          <h2 className="text-2xl font-bold mb-2">
            <FaHandshakeAngle size={30} /> Trust
          </h2>
          <p className="text-xl text-left">
            We instate everlasting connection with credibility of consistent
            quality in learning & growth to our students, clients, partners, and
            employees. Our solid foundation of high standards, integrity &
            commitment to excellence are the benchmarks for the trust we've
            received over the years.
          </p>
        </div>
      </div>
      <h1 className="text-2xl text-center font-bold mt-16 text-[#ff00ff] font-serif">
        Partnerships & Affiliations
      </h1>

      <p className="text-center text-lg mt-2 max-w-3xl mx-auto">
        We collaborate with leading technology companies and certification
        organizations to ensure our students receive industry-recognized
        training and opportunities.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-12 items-center bg-gray-100 mt-6">
        <img
          className="h-12 mx-auto"
          src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
          alt="Microsoft"
        />

        <img
          className="h-12 mx-auto"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg"
          alt="Cisco"
        />

        <img
          className="h-12 mx-auto"
          src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
          alt="Google"
        />

        <img
          className="h-12 mx-auto"
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="AWS"
        />
      </div>
    </div>
  );
};

export default About;
