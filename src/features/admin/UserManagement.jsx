import React, { useContext, useEffect, useState } from "react";
import api from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users/get-all", {
        withCredentials: true,
      });

      setUsers(res.data.users || res.data);

      console.log(res.data);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };
  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure want to delete ${name}` || "This user")) {
      try {
        await api.delete(`/users/delete/${id}`, {
          withCredentials: true,
        });

        setUsers(users.filter((user) => user._id !== id));

        toast.success(`${name} deleted successfully!`);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete user");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Student Management</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 table-fixed">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left w-1/5">Profile</th>
              <th className="py-3 px-4 text-left w-1/5">Name</th>
              <th className="py-3 px-4 text-left w-1/4">Email</th>
              <th className="py-3 px-4 text-left w-1/5">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="py-3 px-4">
                  <img
                    className="w-16 h-16 rounded-2xl object-cover"
                    src={user.profile}
                    alt={user.name}
                  />
                </td>
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>

                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/edit-user/${user._id}`, {
                          state: { user },
                        })
                      }
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(user._id, user.name)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
