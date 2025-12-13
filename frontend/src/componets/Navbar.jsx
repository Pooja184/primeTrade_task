import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/axios";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="bg-white shadow-md px-16 p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">PrimeTrade Blog App</h1>

      <div className="flex gap-6">
         <Link to="/dashboard" className="hover:text-blue-600">
          Home
        </Link>
        <Link to="/add-blog" className="hover:text-blue-600">
          Add Blog
        </Link>

        <Link to="/my-blogs" className="hover:text-blue-600">
          My Blogs
        </Link>

        <Link to="/profile" className="hover:text-blue-600">
          My Profile
        </Link>

        <button
          onClick={handleLogout}
          className="text-red-600 font-semibold hover:text-red-800"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
