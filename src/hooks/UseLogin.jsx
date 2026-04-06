import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UseLogin = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Basic validation before hitting the API
    if (!userData.email || !userData.password) {
      return toast.warn("Please fill in all fields");
    }

    try {
      const user = await loginUser(userData.email, userData.password);

      // If user is null, AuthContext already showed a toast, 
      // so we just stop here.
      if (!user) return; 

      toast.success(`Welcome back, ${user.name}!`);
      setUserData({ email: "", password: "" });

      // 2. Robust Role-Based Navigation
      const role = user.role?.toLowerCase(); 

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "instructor") {
        navigate("/instructor/dashboard"); // Better for your Training System
      } else {
        navigate("/"); 
      }
      
    } catch (error) {
      console.error("Login hook error:", error);
    }
  };

  return { userData, handleChange, handleSubmit };
};

export default UseLogin;