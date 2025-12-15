import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import toast from "react-hot-toast";
import Navbar from "../componets/Navbar";

const AddBlog = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // client-side validation
    if (!title || !description || !image) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);

      // use form data because we are dealing with files
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);

      // console.log(formData)
      await api.post("/blog/add-blog", formData);

      toast.success("Blog added successfully ");

      setTitle("");
      setDescription("");
      setImage(null);
      setPreview(null);

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add blog");
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
          <h2 className="text-2xl font-bold mb-6 text-center">Add New Blog</h2>

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

          {/* it shows instant preview of the img */}
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-full h-48 object-cover rounded mb-4"
            />
          )}

          <button
            disabled={loading}
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Uploading..." : "Add Blog"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBlog;
