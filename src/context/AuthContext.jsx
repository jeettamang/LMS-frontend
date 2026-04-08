import { useReducer, useEffect, createContext } from "react";
import { toast } from "react-toastify";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const initialState = {
  userInfo: (() => {
    const savedUser = localStorage.getItem("userInfo");
    if (!savedUser || savedUser === "undefined") return null;
    try {
      return JSON.parse(savedUser);
    } catch (e) {
      return null;
    }
  })(),
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { userInfo: action.payload };

    case "getMe":
      return { userInfo: action.payload };

    case "logout":
      return { userInfo: null };

    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();
  const loginUser = async (email, password) => {
    try {
      let res;
      let userData = null;
      try {
        res = await api.post("/users/login", { email, password });
        userData = res.data.userData;
      } catch (userError) {
        res = await api.post("/instructor/login", { email, password });
        userData = res.data.instructorDetails;
      }

      if (userData) {
        localStorage.setItem("userInfo", JSON.stringify(userData));

        dispatch({
          type: "login",
          payload: userData,
        });

        return userData;
      }
      return null;
    } catch (error) {
      console.error(
        "Login failed for all roles:",
        error.response?.data || error.message,
      );

      const errorMessage =
        error.response?.data?.message || "Invalid email or password";
      toast.error(errorMessage);
      return null;
    }
  };
  const getMe = async () => {
    try {
      let res;
      try {
        res = await api.get("/users/get-me");
      } catch {
        res = await api.get("/instructor/get-me");
      }

      dispatch({
        type: "getMe",
        payload: res.data.user || res.data.instructor,
      });
    } catch (error) {
      dispatch({ type: "logout" });
    }
  };

  useEffect(() => {
    if (!state.userInfo) {
      getMe();
    }
  }, []);

  // LOGOUT
  const logout = async () => {
    try {
      await api.post("/users/logout");
    } catch (error) {
      console.error("Server logout failed:", error.message);
    }

    localStorage.removeItem("userInfo");

    dispatch({
      type: "logout",
    });

    toast.info("Logged out");

    navigate("/login");
  };
  return (
    <AuthContext.Provider
      value={{
        state,
        loginUser,
        getMe,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
