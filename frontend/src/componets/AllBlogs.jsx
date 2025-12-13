import { useEffect, useState } from "react";
import api from "../utils/axios";
import toast from "react-hot-toast";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [commentText, setCommentText] = useState({});
  const [comments, setComments] = useState({});
  const [openComments, setOpenComments] = useState({}); 

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/blog/all-blogs");
      setBlogs(res.data.blogs);
    } catch (error) {
      toast.error("Failed to load blogs");
    }
  };

  const fetchComments = async (blogId) => {
    try {
      const res = await api.get(`/blog/${blogId}/comments`);
      setComments((prev) => ({
        ...prev,
        [blogId]: res.data.comments,
      }));
    } catch (error) {
      toast.error("Failed to load comments");
    }
  };

  const toggleComments = async (blogId) => {
    if (openComments[blogId]) {
      setOpenComments((prev) => ({
        ...prev,
        [blogId]: false,
      }));
      return;
    }

    await fetchComments(blogId);

    setOpenComments((prev) => ({
      ...prev,
      [blogId]: true,
    }));
  };

  const handleAddComment = async (blogId) => {
    if (!commentText[blogId]) {
      return toast.error("Comment cannot be empty");
    }

    try {
      await api.post(`/blog/${blogId}/comments`, {
        text: commentText[blogId],
      });

      toast.success("Comment added");

      setCommentText((prev) => ({
        ...prev,
        [blogId]: "",
      }));

      fetchComments(blogId);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add comment");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        All Blogs
      </h1>

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
                By {blog.author?.name || "Unknown"} •{" "}
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>

              <p className="text-gray-700 text-sm line-clamp-3">
                {blog.description}
              </p>

              <button
                onClick={() => toggleComments(blog._id)}
                className="text-blue-600 mt-4 text-sm font-semibold"
              >
                {openComments[blog._id] ? "Hide Comments" : "View Comments"}
              </button>

              {/* Comments Section */}
              {openComments[blog._id] && comments[blog._id] && (
                <div className="mt-4">
                  {comments[blog._id].length === 0 && (
                    <p className="text-sm text-gray-500">
                      No comments yet
                    </p>
                  )}

                  {comments[blog._id].map((comment) => (
                    <div
                      key={comment._id}
                      className="border-t py-2 text-sm"
                    >
                      <p className="font-semibold">
                        {comment.author?.name || "User"}
                      </p>
                      <p className="text-gray-700">
                        {comment.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4">
                <textarea
                  placeholder="Write a comment..."
                  className="border p-2 w-full rounded text-sm"
                  value={commentText[blog._id] || ""}
                  onChange={(e) =>
                    setCommentText((prev) => ({
                      ...prev,
                      [blog._id]: e.target.value,
                    }))
                  }
                />

                <button
                  onClick={() => handleAddComment(blog._id)}
                  className="bg-blue-600 text-white px-4 py-1 rounded mt-2 text-sm"
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
