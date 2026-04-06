import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";

const Blogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await api.get(
        `/blogs/list?page=${page}&limit=6&title=${search}`,
      );

      setBlogs(res.data.data.blogs);
      setTotalPages(res.data.data.totalPages);
    } catch (err) {
      setError("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchBlogs();
    }, 500);

    return () => clearTimeout(delay);
  }, [page, search]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Blogs</h1>
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="w-full md:w-1/2 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            onClick={() => {
              navigate(`/getBySlug/${blog.slug}`);
            }}
            key={blog._id}
            className="bg-gray-100 shadow-md cursor-pointer rounded-xl mt-2 overflow-hidden hover:shadow-lg transition"
          >
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-52 object-fill rounded-t-2xl p-2"
              />
            )}

            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>

              <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                {blog.content}
              </p>

              <p className="text-sm text-gray-500">
                Author:{" "}
                <span className="text-sm font-bold">
                  {blog.author?.name ||
                    blog.author?.[0]?.name ||
                    "System Admin"}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {!loading && blogs.length === 0 && (
        <p className="text-center mt-6 text-gray-500">No blogs found</p>
      )}

      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Blogs;
