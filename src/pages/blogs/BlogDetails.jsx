import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/axios";

const BlogDetails = () => {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBlog = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/blogs/getBySlug/${slug}`);

      setBlog(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      setError("Failed to fetch blog details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!blog) return <p className="text-center mt-10">No blog found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Image */}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-92 object-cover rounded-xl  mb-6"
        />
      )}

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      {/* Author */}
      <p className="text-gray-600 mb-4">
        Author:{" "}
        <span className="font-semibold">{blog.author?.name || "Unknown"}</span>
      </p>

      {/* Content */}
      <p className="text-gray-700 leading-7 whitespace-pre-line">
        {blog.content}
      </p>
    </div>
  );
};

export default BlogDetails;
