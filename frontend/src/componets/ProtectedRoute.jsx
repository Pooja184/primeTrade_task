import { useEffect, useState } from "react";
import api from "../utils/axios";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/auth/profile");
        setAllowed(true);
      } catch {
        setAllowed(false);
      }
    };
    checkAuth();
  }, []);

  if (allowed === null) return <p className="mt-20 text-center">Loading...</p>;

  return allowed ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
