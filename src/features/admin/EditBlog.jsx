import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../utils/axios";
import { toast } from "react-toastify";
import { Save, Image as ImageIcon } from "lucide-react";

const CreateBlog = () => {
  const { state } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [preview, setPreview] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const blogData = new FormData();
    blogData.append("title", blogs.title);
    blogData.append("content", blogs.content);

    // CRITICAL: Ensure the current user's ID is sent as the author
    // This comes from your AuthContext state
    if (state?.userInfo?._id) {
      blogData.append("author", state.userInfo._id);
    }

    if (blogs.image) {
      blogData.append("image", blogs.image);
    }

    try {
      const res = await api.put(`/blogs/update-by-slug/${slug}`, blogData);
      toast.success("Blog updated successfully!");
      navigate("/admin/blogs");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Article</h1>
      <form
        onSubmit={handleUpdate}
        className="bg-white p-8 rounded-3xl border shadow-sm space-y-6"
      >
        <div>
          <label className="block mb-2 font-semibold">Title</label>
          <input
            className="w-full p-3 border rounded-xl"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Featured Image</label>
          <input
            type="file"
            onChange={(e) => {
              setFormData({ ...formData, image: e.target.files[0] });
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
          {preview && (
            <img
              src={preview}
              className="mt-4 w-40 h-24 rounded-lg object-cover"
            />
          )}
        </div>

        <div>
          <label className="block mb-2 font-semibold">Content</label>
          <textarea
            rows="10"
            className="w-full p-3 border rounded-xl"
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2"
        >
          <Save size={20} /> Publish Article
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
