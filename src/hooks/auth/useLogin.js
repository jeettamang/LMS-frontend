import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const useLogin = () => {
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

    if (!userData.email || !userData.password) {
      return toast.warn("Please fill in all fields");
    }

    try {
      const user = await loginUser(userData.email, userData.password);
      if (!user) return;

      toast.success(`Welcome back, ${user.name}!`);
      setUserData({ email: "", password: "" });
      const role = user.role?.toLowerCase();

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "instructor") {
        navigate("/instructor/dashboard"); 
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login hook error:", error);
    }
  };

  return { userData, handleChange, handleSubmit };
};

export default useLogin;
