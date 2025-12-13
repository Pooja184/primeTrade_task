import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/axios";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

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
    <nav className="bg-white shadow-md px-6 md:px-16 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">PrimeTrade Blog App</h1>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <div className="hidden md:flex gap-6 items-center">
          <Link
            to="/dashboard"
            className="flex items-center gap-1 hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/add-blog"
            className="flex items-center gap-1 hover:text-blue-600"
          >
            Add Blog
          </Link>

          <Link
            to="/my-blogs"
            className="flex items-center gap-1 hover:text-blue-600"
          >
            My Blogs
          </Link>

          <Link
            to="/profile"
            className="flex items-center gap-1 hover:text-blue-600"
          >
            My Profile
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-red-600 font-semibold hover:text-red-800"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 border-t pt-4">
          <Link
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/add-blog"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 hover:text-blue-600"
          >
            Add Blog
          </Link>

          <Link
            to="/my-blogs"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 hover:text-blue-600"
          >
            My Blogs
          </Link>

          <Link
            to="/profile"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 hover:text-blue-600"
          >
            My Profile
          </Link>

          <button
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
            className="flex items-center gap-2 text-red-600 font-semibold"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
