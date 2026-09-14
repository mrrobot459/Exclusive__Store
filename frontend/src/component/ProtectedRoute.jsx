import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const getTokenPayload = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((char) => `%${("00" + char.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const location = useLocation();
  const user = getTokenPayload();
  const token = localStorage.getItem("token");

  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location, message: "Please login first to access the cart." }} replace />;
  }

  if (requireAdmin && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
