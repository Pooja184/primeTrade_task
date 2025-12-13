import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/axios";
import toast from "react-hot-toast";
import Navbar from "../componets/Navbar";

const EditBlog = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBlog = async () => {
    try {
      const res = await api.get(`/blog/${blogId}`);
      const blog = res.data.blog;

      setTitle(blog.title);
      setDescription(blog.description);
      setPreview(blog.image);
    } catch (error) {
      toast.error("Failed to load blog");
      navigate("/my-blogs");
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      return toast.error("Title and description are required");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);

      if (image) {
        formData.append("image", image);
      }

      await api.put(`/blog/${blogId}`, formData);

      toast.success("Blog updated successfully");
      navigate("/my-blogs");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Edit Blog
          </h2>

          <input
            type="text"
            placeholder="Blog Title"
            className="border p-2 w-full rounded mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Blog Description"
            className="border p-2 w-full rounded mb-4 h-32 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            className="mb-4"
            onChange={handleImageChange}
          />

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-full h-48 object-cover rounded mb-4"
            />
          )}

          <button
            disabled={loading}
            className="bg-blue-600 text-white w-full py-2 rounded"
          >
            {loading ? "Updating..." : "Update Blog"}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditBlog;
