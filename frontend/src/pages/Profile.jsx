import React, { useEffect, useState } from "react";
import api from "../api/Api.js";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data.user || null);
      } catch (error) {
        console.error(error);
        const savedUser = JSON.parse(localStorage.getItem("user") || "null");
        setUser(savedUser);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  if (!token) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Login required</h1>
        <p className="mt-3 text-gray-600">Please sign in to view your profile.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="p-10 text-center text-gray-600">Loading profile...</div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <div className="mt-6 space-y-3 text-gray-700">
          <p><span className="font-semibold">Email:</span> {user?.email || "Not available"}</p>
          <p><span className="font-semibold">Status:</span> Logged in</p>
          <p><span className="font-semibold">Role:</span> {user?.role || "user"}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
