import { useState } from "react";

import {
  FaClock,
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaPhoneAlt,
  FaTiktok,
} from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import api from "../../utils/axios";
import TextFields from "../../components/common/TextFields";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    purpose: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fetchedMessage = await api.post("/contact/send-message", formData);
      setFormData({ name: "", email: "", purpose: "", message: "" });
      console.log(fetchedMessage.data);
    } catch (error) {
      console.error(error);
      console.error(error.response?.data);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10">
      <div className=" flex items-center justify-center max-w-6xl w-full grid md:grid-cols-2 gap-8 items-start">
        <div className="bg-green-600 mt-4 p-8 w-full rounded-md text-white space-y-10">
          <div>
            <h5 className="flex items-center gap-2 font-bold text-lg">
              <FaLocationPin /> Our Address
            </h5>
            <p className="italic">New Baneshwor, Kathmandu, Bagmati, Nepal</p>
          </div>

          <div>
            <h5 className="flex items-center gap-2 font-bold text-lg">
              <FaPhone /> Our Contacts
            </h5>
            <div className="flex flex-col gap-2">
              <div>
                <h6 className="font-bold">Mobile</h6>
                <p className="italic">980 5689789</p>
                <p className="italic">9841 275897</p>
              </div>
              <div>
                <h6 className="font-bold">Landline</h6>
                <p className="italic">01-4783972</p>
              </div>
            </div>
          </div>
          <div>
            <h5 className="flex items-center gap-2 font-bold text-lg">
              <FaClock /> Our Service Time
            </h5>
            <div className="flex flex-col gap-2">
              <div>
                <h6 className="font-bold">Mon - Fri</h6>
                <p className="italic">10 am - 8 pm</p>
              </div>
              <div>
                <h6 className="font-bold">Sat - Sun</h6>
                <p className="italic">Closed</p>
              </div>
            </div>
          </div>

          <div>
            <p className="italic">Get in touch on social networks</p>
            <div className="flex gap-4 py-2">
              <FaFacebook size={32} />
              <FaInstagram size={32} />
              <FaTiktok size={32} />
            </div>
          </div>
        </div>

        <div className="w-full bg-white p-8 rounded-md shadow-lg">
          <h1 className="text-2xl font-bold text-center text-green-700 mb-6 font-serif">
            Feel free to ask questions
          </h1>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <TextFields
              label="Name"
              name="name"
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full"
            />
            <TextFields
              label="Email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full"
            />
            <div className="flex flex-col gap-1 w-full">
              <label
                className="text-sm font-medium text-gray-900"
                htmlFor="purpose"
              >
                Purpose
              </label>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="purpose"
                required
                value={formData.purpose}
                onChange={handleChange}
              >
                <option value="">Select option</option>
                <option value="course-inquiry">Course Inquiry</option>
                <option value="technical-support">Technical Support</option>
                <option value="admission">Admission Information</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label
                className="text-sm font-medium text-gray-900"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2"
                name="message"
                id="message"
                required
                value={formData.message}
                rows={6}
                onChange={handleChange}
                placeholder="Type your message..."
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl w-full mt-4"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="w-full mt-10">
        <h1 className="text-3xl text-center font-bold mb-4 font-serif">
          Visit our location
        </h1>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.4810592043877!2d85.34317037546609!3d27.671522976203146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190536c1caa7%3A0xf92fcf603dac3960!2sSipalaya%20Info%20Tech%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1773737200121!5m2!1sen!2snp"
          className="w-full h-96"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default Contact;
