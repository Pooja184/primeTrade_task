import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import toast from "react-hot-toast";
import Navbar from "../componets/Navbar";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMyBlogs = async () => {
    try {
      const res = await api.get("/blog/my-blogs");
      setBlogs(res.data.blogs);
    } catch (error) {
      toast.error("Failed to fetch your blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blogId) => {
    // console.log(blogId)
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/blog/${blogId}`);
      toast.success("Blog deleted successfully");

      setBlogs((prev) => prev.filter((b) => b._id !== blogId));
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <p className="text-center mt-20 text-lg">Loading your blogs...</p>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 min-h-screen p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          My Blogs
        </h1>

        {blogs.length === 0 ? (
          <p className="text-center text-gray-600">
            You haven’t created any blogs yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {blog.title}
                  </h2>

                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>

                  <p className="text-gray-700 text-sm line-clamp-3">
                    {blog.description}
                  </p>

                  <div className="flex justify-between mt-4">
                    <button
                      className="text-blue-600 font-semibold text-sm"
                      onClick={() =>
                        navigate(`/edit-blog/${blog._id}`)
                      }
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="text-red-600 font-semibold text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyBlogs;
