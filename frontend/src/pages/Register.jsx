import { useState } from "react";
import api from "../utils/axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);

      toast.success("Registration Successful!");
      // use timeout function so it takes time to redirect
      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-md w-full max-w-md rounded"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {/* use one input type instead of separate input for each field, it reduces code duplication */}
        {["name", "email", "password", "confirmPassword"].map((field) => (
          <input
            key={field}
            type={field.includes("password") ? "password" : "text"}
            placeholder={field}
            className="border p-2 w-full rounded mb-3"
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            required
          />
        ))}

        <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition">
          Register
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
