import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { state, logout } = useContext(AuthContext);
  const user = state.userInfo;

  if (!user) return <div className="p-24 text-center">Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="p-12 bg-white shadow-xl rounded-3xl border border-gray-100 flex flex-col w-full max-w-lg">
        <img
          className="w-32 h-32 rounded-2xl mx-auto object-cover border-4 border-blue-50 shadow-sm"
          src={user?.profile || user?.profileImage || "/default-avatar.png"}
          alt={user.name}
        />
        <div className="text-center mt-6">
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
            {user.role}
          </span>
          <p className="text-gray-500 text-sm mt-2">{user.email}</p>
        </div>

        <div className="flex mt-8 gap-3">
          <button
            onClick={() => navigate("/edit-profile", { state: user })}
            className="flex-1 py-3 rounded-xl bg-amber-500 text-white font-semibold hover:bg-amber-600 transition-colors"
          >
            Edit Profile
          </button>
          <button
            onClick={logout}
            className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
