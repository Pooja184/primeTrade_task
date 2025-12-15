import { useEffect, useState } from "react";
import api from "../utils/axios"; 
import Navbar from "../componets/Navbar"; 
import AllBlogs from "../componets/AllBlogs"; 

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Function to fetch current logged in user profile
    const loadProfile = async () => {
      try {
        // Call backend API to get user profile
        const res = await api.get("/auth/profile");
        setUser(res.data.user);
      } catch {
        // If user is not authenticated, redirect to login page
        window.location.href = "/login";
      }
    };
    loadProfile();
  }, []);

  if (!user) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div>
      {/* Navbar visible only after user is authenticated */}
      <Navbar />
      <AllBlogs />
    </div>
  );
};

export default Dashboard;
