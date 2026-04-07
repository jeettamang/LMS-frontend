import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../utils/axios";

const useBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

  const fetchBlogs = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.get(`/blogs/list?page=${page}&title=${searchTerm}`);

      setBlogs(res.data.data.blogs || []);
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
    fetchBlogs(1);
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

    // Optimistic Update
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog.slug === slug ? { ...blog, status: newStatus } : blog,
      ),
    );

    try {
      await api.patch(`/blogs/status-slug/${slug}`, { status: newStatus });
      toast.success(`Blog moved to ${newStatus}`);
    } catch (err) {
      toast.error("Status update failed");
      // Revert if API fails
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.slug === slug ? { ...blog, status: currentStatus } : blog,
        ),
      );
    }
  };

  return {
    blogs,
    loading,
    handleDelete,
    handleStatusToggle,
    searchTerm,
    setSearchTerm,
    pagination,
    fetchBlogs,
  };
};

export default useBlogs;
