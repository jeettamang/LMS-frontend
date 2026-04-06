import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdOutlineSchool } from "react-icons/md";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MdOutlineSchool className="text-blue-500 text-3xl" />
            <h2 className="text-2xl font-black text-white tracking-tighter uppercase">
              IT <span className="text-blue-500">Training</span>
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            Leading the way in tech education in Nepal. We provide high-quality
            training in Web Development, MERN Stack, and Stock Market Analysis.
          </p>
          <div className="flex gap-4 pt-2">
            <a
              href="https://www.facebook.com/jeetttamang2433"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <FaFacebook size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/jeet-tamang/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <FaLinkedin size={22} />
            </a>
            <a
              href="https://github.com/jeettamang"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <FaGithub size={22} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">
            Navigation
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-500 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className="hover:text-blue-500 transition-colors"
              >
                Explore Courses
              </Link>
            </li>
            <li>
              <Link
                to="/blogs"
                className="hover:text-blue-500 transition-colors"
              >
                Technical Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-blue-500 transition-colors"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">
            Support
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                to="/contact"
                className="hover:text-blue-500 transition-colors"
              >
                Contact Support
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="hover:text-blue-500 transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="hover:text-blue-500 transition-colors"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                to="/verify"
                className="hover:text-blue-500 transition-colors"
              >
                Certificate Verification
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">
            Contact Us
          </h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-blue-500 mt-1" />
              <span>Kathmandu, Nepal</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-blue-500" />
              <span>+977 9815333700</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-blue-500" />
              <span>sipalayainfotech.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>
          © {currentYear} IT Training Management System. All rights reserved.
        </p>
        <p>Built by Jeet Tamang in Nepal</p>
      </div>
    </footer>
  );
};

export default Footer;
