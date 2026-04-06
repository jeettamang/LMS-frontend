import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ArrowLeft, ShieldCheck, MapPin, Phone } from "lucide-react";

const EnrollCourse = () => {
  const { state } = useContext(AuthContext);
  const userInfo = state?.userInfo;
  const { id } = useParams();
  const navigate = useNavigate();
  const { state: course } = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    if (userInfo) {
      setFormData((prev) => ({
        ...prev,
        name: userInfo.name || "",
        email: userInfo.email || "",
      }));
    }
  }, [userInfo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!course) {
    return (
      <div className="text-center mt-20">
        <p className="mb-4">Session lost or invalid course.</p>
        <button onClick={() => navigate("/courses")} className="text-blue-500 underline">
          Back to Courses
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/payment", {
      state: {
        ...formData,
        courseId: id,
        amount: course.price,
        title: course.title,
        userId: userInfo?.id,
      },
    });
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-gray-500 hover:text-gray-800 mb-6 transition font-medium"
      >
        <ArrowLeft size={18} className="mr-1" /> Back to Details
      </button>

      <div className="flex flex-col lg:flex-row gap-8 bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
        
        {/* LEFT SIDE: FORM */}
        <div className="flex-1 p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Checkout</h2>
          <p className="text-gray-500 mb-8">Please confirm your student details below.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Full Name</label>
                <input
                  name="name"
                  readOnly
                  value={formData.name}
                  className="w-full border-0 bg-gray-50 p-3.5 rounded-xl text-gray-500 cursor-not-allowed font-medium"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email</label>
                <input
                  name="email"
                  readOnly
                  value={formData.email}
                  className="w-full border-0 bg-gray-50 p-3.5 rounded-xl text-gray-500 cursor-not-allowed font-medium"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-xs font-bold text-gray-700 uppercase ml-1">Shipping/Current Address</label>
              <div className="relative">
                <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="address"
                  placeholder="e.g. Baneshwor, Kathmandu"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-200 pl-10 pr-4 py-3.5 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase ml-1">Mobile Number</label>
              <div className="relative">
                <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="98********"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-200 pl-10 pr-4 py-3.5 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition shadow-lg shadow-blue-100 flex items-center justify-center gap-2 mt-8 text-lg">
              <ShieldCheck size={22} />
              Confirm & Pay Rs. {course.price}
            </button>
          </form>
        </div>

        {/* RIGHT SIDE: COURSE IMAGE & SUMMARY */}
        <div className="w-full lg:w-[400px] bg-gray-50 p-8 lg:p-12 border-l border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-700 mb-6 border-b pb-2">Order Summary</h3>
            <div className="rounded-2xl overflow-hidden shadow-md mb-6 border-4 border-white">
              <img 
                src={course.image || "https://via.placeholder.com/400x250"} 
                alt={course.title} 
                className="w-full h-48 object-cover hover:scale-105 transition duration-500"
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-gray-600 font-medium leading-tight">{course.title}</span>
                <span className="text-blue-600 font-bold whitespace-nowrap">Rs. {course.price}</span>
              </div>
              <div className="flex justify-between text-sm pt-4 border-t border-gray-200">
                <span className="text-gray-500">Platform Fee</span>
                <span className="text-gray-800 font-medium">Rs. 0</span>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-white rounded-2xl border border-gray-200">
            <div className="flex justify-between items-center text-xl font-black text-gray-800">
              <span>Total</span>
              <span>Rs. {course.price}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EnrollCourse;