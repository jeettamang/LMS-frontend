import { Link } from "react-router-dom";
import UseLogin from "../../hooks/UseLogin";
import TextFields from "../../components/common/TextFields";

const Login = () => {
  const { userData, handleChange, handleSubmit } = UseLogin();
  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-center p-2 text-2xl font-semibold font-serif">
        Login
      </h2>
      <form onSubmit={handleSubmit}>
        <TextFields
          type="email"
          label="Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        <TextFields
          type="password"
          label="Password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="************************"
        />

        <button
          type="submit"
          className="w-full p-2 mt-4 rounded-2xl bg-blue-500 hover:bg-blue-700 cursor-pointer text-white"
        >
          Login
        </button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Dont't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
