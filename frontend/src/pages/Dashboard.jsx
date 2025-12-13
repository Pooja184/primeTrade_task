import { useEffect, useState } from "react";
import api from "../utils/axios";
import Navbar from "../componets/Navbar";
import AllBlogs from "../componets/AllBlogs";

const Dashboard = () => {
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
      <AllBlogs/>
    </div>
  );
};

export default Dashboard;
