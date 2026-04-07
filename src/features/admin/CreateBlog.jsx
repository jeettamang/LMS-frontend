import { useNavigate } from "react-router-dom";
import { Save, Image as ImageIcon, ArrowLeft, Loader2 } from "lucide-react";
import useCreateBlogs from "../../hooks/admin/useCreateBlogs";
const CreateBlog = () => {
  const navigate = useNavigate();
  const {
    formData,
    preview,
    loading,
    handleChange,
    handleFileChange,
    handleSubmit,
  } = useCreateBlogs();
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 transition"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-50 bg-gray-50/50">
          <h1 className="text-2xl font-bold text-gray-800">
            Create New Article
          </h1>
          <p className="text-sm text-gray-500">
            Share your thoughts with the world.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter a catchy title..."
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Featured Image
            </label>
            <div className="flex items-start gap-6">
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-40 h-24 rounded-xl object-cover border border-gray-200 shadow-sm"
                />
              )}
              <div className="flex-1">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition hover:border-blue-300">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="text-gray-400 mb-2" size={28} />
                    <p className="text-xs text-gray-500">
                      Upload your thumbnail (PNG, JPG)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Content
            </label>
            <textarea
              name="content"
              rows="10"
              placeholder="Write your article content here..."
              value={formData.content}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
              required
            ></textarea>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-12 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100 disabled:bg-gray-400"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Save size={20} />
              )}
              {loading ? "Publishing..." : "Publish Article"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
