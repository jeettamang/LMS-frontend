import { Link } from "react-router-dom";
import UseRegister from "../../hooks/UseRegister";
import TextFields from "../../components/common/TextFields";

const Register = () => {
  const { userData, handleChange, handleSubmit } = UseRegister();

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-center p-2 text-2xl font-semibold font-serif">
        Get Registered
      </h2>

      <form onSubmit={handleSubmit}>
        {userData.profile && (
          <div className="mt-4 flex justify-center">
            <img
              src={URL.createObjectURL(userData.profile)}
              alt="preview"
              className="w-32 h-32 object-cover rounded-full"
            />
          </div>
        )}

        {/* Fields */}
        <TextFields
          type="text"
          label="Name"
          name="name"
          value={userData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />

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
          placeholder="**********"
        />

        {/* Image Upload */}
        <div className="flex flex-col gap-1 mt-3">
          <label className="text-sm font-medium">Profile Image</label>
          <input
            type="file"
            name="profile"
            accept="image/*"
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
        </div>

        {/* ✅ Manual Register Button */}
        <button
          type="submit"
          className="w-full p-2 mt-4 rounded-2xl bg-blue-500 hover:bg-blue-700 text-white hover:cursor-pointer"
        >
          Register
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border p-2 rounded-xl hover:bg-gray-100 hover:cursor-pointer"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
            alt="google"
          />
          Continue with Google
        </button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
