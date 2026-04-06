import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Search,
  FileText,
  CheckCircle,
  Clock,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "../../utils/axios";

const BlogManagement = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

  const fetchBlogs = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.get(`/blogs/list?page=${page}&title=${searchTerm}`);

      setBlogs(res.data.data.blogs || []);
      console.log(res.data);
      setPagination({
        page: res.data.data.page,
        totalPages: res.data.data.totalPages,
      });
    } catch (error) {
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [searchTerm]);

  const handleDelete = async (slug) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await api.delete(`/blog/delete-by-slug/${slug}`);
        toast.success("Blog deleted");
        fetchBlogs(pagination.page);
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  const handleStatusToggle = async (slug, currentStatus) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog.slug === slug ? { ...blog, status: newStatus } : blog,
      ),
    );

    try {
      await api.patch(`/blogs/status-slug/${slug}`, { status: newStatus }); //
      toast.success(`Blog moved to ${newStatus}`);
    } catch (err) {
      toast.error("Status update failed");
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.slug === slug ? { ...blog, status: currentStatus } : blog,
        ),
      );
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Blog Management</h1>
          <p className="text-sm text-gray-500">
            Create and manage your articles & news.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/create-blog")}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-100"
        >
          <Plus size={18} /> New Article
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6 max-w-md">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search by title..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm font-semibold">
              <th className="p-4">Article</th>
              <th className="p-4">Author</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan="5" className="p-10 text-center text-blue-500">
                  Loading blogs...
                </td>
              </tr>
            ) : blogs.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-10 text-center text-gray-400">
                  No articles found.
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50/50 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={blog.image || "https://via.placeholder.com/150"}
                        className="w-12 h-12 rounded-lg object-cover"
                        alt=""
                      />
                      <div>
                        <p className="font-semibold text-gray-800 line-clamp-1">
                          {blog.title}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-gray-600">
                      {blog.author?.name ? blog.author.name : "System Admin"}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleStatusToggle(blog.slug, blog.status)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition ${
                        blog.status === "published"
                          ? "bg-green-50 text-green-600 hover:bg-green-100"
                          : "bg-amber-50 text-amber-600 hover:bg-amber-100"
                      }`}
                    >
                      {blog.status === "published" ? (
                        <CheckCircle size={12} />
                      ) : (
                        <Clock size={12} />
                      )}
                      {blog.status}
                    </button>
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() =>
                          navigate(`/admin/edit-blog/${blog.slug}`, {
                            state: blog,
                          })
                        }
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.slug)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-50 flex justify-center gap-2">
          {[...Array(pagination.totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => fetchBlogs(i + 1)}
              className={`px-3 py-1 rounded-md ${pagination.page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-100"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogManagement;
