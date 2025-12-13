import { useEffect, useState } from "react";
import api from "../utils/axios";
import Navbar from "../componets/Navbar";

const MyProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get("/auth/profile");
        setUser(res.data.user);
      } catch {
        window.location.href = "/login";
      }
    };
    loadProfile();
  }, []);

  if (!user) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div>
      <Navbar />

      <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md p-6 rounded">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user.name} 👋</h1>
        <p className="text-gray-600">Email: {user.email}</p>
      </div>
    </div>
  );
};

export default MyProfile;
